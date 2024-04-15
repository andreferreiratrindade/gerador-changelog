import OpenAPIValidationHandler from "../../src/validation/OpenAPIValidationHandler"
import oldSpec from "../documents/yaml-OpenAPI/dereferenced_files/old.json"
import currentSpec from "../documents/yaml-OpenAPI/dereferenced_files/current.json"

describe('testing validation', () => {

    beforeAll(() => {
        currentSpec.info.version = '2.0.0'
    });

    test("Should throw ValidationError with message - 'The old version of the specification is not inferior to the current version'", async () => {
        const handler = new OpenAPIValidationHandler();

        oldSpec.info.version = '3.0.0rc1.0'

        await expect(handler.handleValidation(oldSpec, currentSpec)).rejects.toThrow("The old version of the specification is not inferior to the current version")
    })

    test("Should throw ValidationError with message - 'The specification provided it's not valid'", async () => {
        const handler = new OpenAPIValidationHandler();

        const invalidSpec = oldSpec
        delete (invalidSpec as any).paths

        await expect(handler.handleValidation(invalidSpec, currentSpec)).rejects.toThrow("The specification provided it's not valid")
    })

    test("Should throw ValidationError with message - 'The specification provided it's not an OpenAPIv3 specification'", async () => {
        const handler = new OpenAPIValidationHandler();
        oldSpec.openapi = '2.0.0'

        await expect(handler.handleValidation(oldSpec, currentSpec)).rejects.toThrow("The specification provided it's not an OpenAPIv3 specification")
    })
})