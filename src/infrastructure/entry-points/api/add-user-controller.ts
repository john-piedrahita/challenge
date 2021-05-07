import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {
    badRequest,
    HttpRequest,
    HttpResponse,
    ok,
    serverError,
    unprocessableEntity
} from "@/infrastructure/helpers/http";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";
import {IUserService} from "@/domain/use-cases/user-service";
import {EMAIL_IN_USE} from "@/infrastructure/helpers/constant";

export class AddUserController  implements IController {

    constructor(
        private readonly addUserService: IUserService
    ) {
    }
    
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {

            const { errors, isValid } = fieldsValidation(request.body)

            if (!isValid) return unprocessableEntity(errors)

            const account = await this.addUserService.addUserService({
                    ...request.body, createdAt: new Date()
                }
            )

            if (!account) return badRequest(EMAIL_IN_USE)

            return ok(account)

        } catch (e) {
            console.log(e)
            return serverError(e)
        }
    }
}
