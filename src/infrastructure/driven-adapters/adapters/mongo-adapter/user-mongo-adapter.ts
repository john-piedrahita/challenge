import {IMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-interfaces-adapter";
import {AddUserParams, UserModel} from "@/domain/models/user";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {EMAIL_PARAM, USER_COLLECTION} from "@/infrastructure/driven-adapters/helpers/constants";

export class UserMongoAdapter implements IMongoInterfacesAdapter {

    async addUserRepository(data: AddUserParams): Promise<UserModel | boolean> {
        return MongoHelper.insertDocumentCollection(data, USER_COLLECTION);
    }

    async checkUserRepository(email: string): Promise<boolean> {
        return MongoHelper.loadDocumentByFieldCollection(EMAIL_PARAM, email, USER_COLLECTION)
    }

}
