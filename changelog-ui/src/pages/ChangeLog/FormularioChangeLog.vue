<template>
  <div class="q-pa-md col-12 row " >
    <q-card
      class="col-12"
      flat
      
      bordered
      v-if="infoApiChanges.oldApi.url.length > 0"
    >
      <q-card-section vertical class="row self-center">
        <div class="text-h8 col-12">
          <q-badge  align="middle" color="red">
            {{ infoApiChanges.oldApi.version }}
          </q-badge>
          {{ infoApiChanges.oldApi.url }}
        </div>

        <div class="text-h8 col-12">
          <q-badge  align="middle" color="green">
            {{ infoApiChanges.currentApi.version }}
          </q-badge>
          {{ infoApiChanges.currentApi.url }}
        </div>

        <q-card-actions horizontal class="justify-around col-xs-4">
          <q-btn flat round color="primary" icon="edit" @click="showForm">
            <q-tooltip class="bg-primary">Gerar outro changeLog</q-tooltip>
          </q-btn>
          <q-btn flat round color="primary" icon="archive" @click="exportTable">
            <q-tooltip class="bg-primary">Exportar resultado para CSV</q-tooltip>
          </q-btn>
          <q-btn flat round color="primary" icon="share" @click="showUrlShare">
            <q-tooltip class="bg-primary">Compartilhar resultado via link url</q-tooltip
            >
          </q-btn>
          <q-btn
            flat
            round
            color="primary"
            icon="difference"
            @click="showDiffFile"
          >
            <q-tooltip class="bg-primary"
              >Visualizar diferenças através de comparador de
              arquivos</q-tooltip
            >
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>

    <q-dialog v-model="formDiolag" persistent full-width>
      <q-card class="col col-12">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Formulário</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            v-if="infoApiChanges.oldApi.url.length > 0"
          />
        </q-card-section>

        <q-card-section>
          <q-form @submit="gerar(changeLogPostModel)">
            <q-card class="my-card">
              <q-card-section class="row">
                <q-input
                  class="col-12"
                  outlined
                  v-model="changeLogPostModel.urlOld"
                  label="Url versão anterior"
                  :rules="[(val) => !!val || 'Campo obrigatório']"
                />
                <q-input
                  class="col-12"
                  outlined
                  v-model="changeLogPostModel.urlCurrent"
                  label="Url versão atual"
                  :rules="[(val) => !!val || 'Campo obrigatório']"
                />

                <q-input
                  outlined
                  class="col-6 col-md-6 col-sm-6 col-xs-12"
                  v-model="changeLogPostModel.templateDescription.templateAdded"
                  label="Template - Adicionado"
                />
                <q-input
                  outlined
                  class="col-6 col-md-6 col-sm-6 col-xs-12"
                  v-model="
                    changeLogPostModel.templateDescription.templateEdited
                  "
                  label="Template - Alterado"
                />
                <q-input
                  outlined
                  class="col-6 col-md-6 col-sm-6 col-xs-12"
                  v-model="
                    changeLogPostModel.templateDescription.templateRemoved
                  "
                  label="Template - Removido"
                />
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn label="Gerar change log" type="submit" color="primary" />
              </q-card-actions>
            </q-card>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="sharerChangeLogDiolag">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Compartilhar</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-btn
            :icon="'content_paste'"
            color="primary"
            @click="copyUrlToBoard"
          />
          <div class="col-12">
            {{ urlToShare }}
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="diffFileDiolag" full-width full-height>
      <q-card class="col col-12">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Diferenças entre versões</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h8 col-12">
            <q-badge transparent align="middle" color="red">
              {{ infoApiChanges.oldApi.version }}
            </q-badge>
            {{ infoApiChanges.oldApi.url }}
          </div>

          <div class="text-h8 col-12">
            <q-badge transparent align="middle" color="green">
              {{ infoApiChanges.currentApi.version }}
            </q-badge>
            {{ infoApiChanges.currentApi.url }}
          </div>
        </q-card-section>
        <q-card-section>
          <code-diff
            :old-string="fileOld"
            :new-string="fileCurrent"
            file-name="test.txt"
            output-format="side-by-side"
          />
        </q-card-section>

        <q-card-section> </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Loading, copyToClipboard, Notify, exportFile } from "quasar";
import { CodeDiff } from "v-code-diff";
import {
  ChangeLogPostModel,
  EndpointChangeLogListModel,
  InfoApiChangeLogModel,
} from "components/models";
import { defineComponent, ref } from "vue";
import axios from "axios";

function getParametersFromUrls(): any {
  const urlParams = new URLSearchParams(window.location.search);

  let parameters: any = {
    urlOld:
      "https://raw.githubusercontent.com/OpenBanking-Brasil/openapi/main/swagger-apis/accounts/1.0.3.yml",
    urlCurrent:
      "https://raw.githubusercontent.com/OpenBanking-Brasil/openapi/main/swagger-apis/accounts/2.0.0.yml",
    hasParameter: false,
  };

  if (urlParams.has("urlOld") && urlParams.has("urlCurrent")) {
    parameters.urlCurrent = urlParams.get("urlCurrent");
    parameters.urlOld = urlParams.get("urlOld");
    parameters.hasParameter = true;
  }

  return parameters;
}

export default defineComponent({
  name: "FormularioChangeLog",
  components: { CodeDiff },
  data() {
    let endpointChangeLogList: EndpointChangeLogListModel[] = [];
    let infoApiChanges: InfoApiChangeLogModel = {
      changeLogPerEndPoint: [],
      currentApi: { apiName: "", url: "", version: "" },
      oldApi: { apiName: "", url: "", version: "" },
    };
    let parameters = getParametersFromUrls();

    const changeLogPostModel: ChangeLogPostModel = {
      urlOld: parameters.urlOld,
      urlCurrent: parameters.urlCurrent,
      typeModel: 1, // URL
      templateDescription: {
        templateAdded: 'Adicionado - "${field}"',
        templateEdited: 'Alterado - "${field}"',
        templateRemoved: 'Removido - "${field}"',
        templateRequired: "Mandatoriedade",
      },
    };

    if (parameters.hasParameter) {
      this.gerar(changeLogPostModel);
    } else {
      this.showForm();
    }

    return {
      changeLogPostModel: changeLogPostModel,
      infoApiChanges: infoApiChanges,
      endpointChangeLogList: endpointChangeLogList,
    };
  },

  setup() {
    return {
      formDiolag: ref(false),
      sharerChangeLogDiolag: ref(false),
      diffFileDiolag: ref(false),
      urlToShare: ref(""),
      fileCurrent: ref(""),
      fileOld: ref(""),
    };
  },

  methods: {
    exportTable() {
      // naive encoding to csv format
      let contentArray: string[] = [];
      let content = "";
      contentArray.push(
        `endpoint;path;description;changeType;oldValue;currentValue`
      );

      this.infoApiChanges.changeLogPerEndPoint.forEach((changePerEndpoint) => {
        changePerEndpoint.changeLogs.forEach((change) => {
          contentArray.push(
            `${this.wrapCsvValue(change.endpoint)};${this.wrapCsvValue(
              change.path
            )};${this.wrapCsvValue(change.description)};${this.wrapCsvValue(
              change.changeType
            )};${this.wrapCsvValue(change.oldValue)};${this.wrapCsvValue(
              change.currentValue
            )}`
          );
        });
      });

      content = contentArray.join("\n");
      const status = exportFile(
        `ChangeLog ${this.infoApiChanges.currentApi.apiName}__${this.infoApiChanges.oldApi.version}__${this.infoApiChanges.currentApi.version}.csv`,
        content,
        "text/csv"
      );
    },
    async copyUrlToBoard() {
      await copyToClipboard(this.urlToShare);
    },
    wrapCsvValue(val: string) {
      val = val.split('"').join('""');
      return `"${val}"`;
    },
    showUrlShare() {
      this.createUrlShare();
      this.sharerChangeLogDiolag = true;
    },
    async showDiffFile() {
      this.showLoading();

      const taskFileOld = axios.get(this.infoApiChanges.oldApi.url);

      const taskFileCurrent = await axios.get(
        this.infoApiChanges.currentApi.url
      );

      const [resultFileOld, resultFileCurrent] = await Promise.all([
        taskFileOld,
        taskFileCurrent,
      ]);

      this.fileOld = resultFileOld.data;
      this.fileCurrent = resultFileCurrent.data;

      this.hideLoading();
      this.diffFileDiolag = true;
    },
    createUrlShare() {
      const url = new URL(window.location.href);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("urlOld");
      urlParams.delete("urlCurrent");

      urlParams.append("urlOld", this.infoApiChanges.oldApi.url);
      urlParams.append("urlCurrent", this.infoApiChanges.currentApi.url);

      url.search = urlParams.toString();
      this.urlToShare = url.href;
    },
    showForm() {
      this.formDiolag = true;
    },
    hideForm() {
      this.formDiolag = false;
    },
    showLoading() {
      Loading.show();
    },
    hideLoading() {
      Loading.hide();
    },
    validations(changeLog: ChangeLogPostModel) {
      let strErros: string[] = [];
      if (!changeLog.urlOld && changeLog.urlOld.length == 0) {
        strErros.push("Url antiga é de preenchimento obrigatório");
      }

      if (!changeLog.urlOld && changeLog.urlOld.length == 0) {
        strErros.push("Url antiga é de preenchimento obrigatório");
      }
    },
    gerar(changeLog: ChangeLogPostModel) {
      this.showLoading();
      this.validations(changeLog);

      axios
        .post(process.env.API_URL || "", changeLog)
        .then((response: any) => {
          this.infoApiChanges = response.data.obj || response.data;
        })
        .catch((error: any) => {
          Notify.create({
            type: "negative",
            message: error,
          });
        })
        .finally(() => {
          this.hideLoading();
          this.hideForm();
          this.$emit("formularioAcionado", this.infoApiChanges);
        });
    },
  },
});
</script>
