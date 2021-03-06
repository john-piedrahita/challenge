import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {
    HttpRequest,
    HttpResponse,
    ok,
    serverError,
    unauthorized,
    unprocessableEntity
} from "@/infrastructure/helpers/http";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";
import {IAuthService} from "@/domain/use-cases/auth-service";

export class AuthController  implements IController {

    constructor(
        private readonly authService: IAuthService
    ) {
    }
    
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { errors, isValid } = fieldsValidation(request.body)

            if (!isValid) return unprocessableEntity(errors)

            const { email, password } = request.body

            const authenticationModel = await this.authService.auth({ email, password })

            if (authenticationModel === null) return unauthorized()

            return ok(authenticationModel)

        } catch (e) {
            return serverError(e)
        }
    }
}
