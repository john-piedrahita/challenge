import {IMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-interfaces-adapter";
import {AddUserParams, UserModel} from "@/domain/models/user";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {ACCESS_TOKEN_PARAM, EMAIL_PARAM, USER_COLLECTION} from "@/infrastructure/driven-adapters/helpers/constants";

export class UserMongoAdapter implements IMongoInterfacesAdapter {

    async addUserRepository(data: AddUserParams): Promise<UserModel | boolean> {
        return MongoHelper.insertDocumentCollection(data, USER_COLLECTION);
    }

    async checkUserRepository(email: string): Promise<boolean> {
        return MongoHelper.loadDocumentByFieldCollection(EMAIL_PARAM, email, USER_COLLECTION)
    }

    async updateTokenRepository(id: string, value: string): Promise<void> {
        return MongoHelper.updateDocumentCollection(id, value, ACCESS_TOKEN_PARAM, USER_COLLECTION)
    }

}
