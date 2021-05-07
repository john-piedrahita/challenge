import {IMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-interfaces-adapter";
import {AddUserParams, UserModel} from "@/domain/models/user";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {ACCESS_TOKEN_PARAM, EMAIL_PARAM, USER_COLLECTION} from "@/infrastructure/driven-adapters/helpers/constants";
import {ILoadUserByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {ILoadAccountTokenRepository} from "@/domain/models/gateways/load-account-token-repository";
import {ObjectId} from 'mongodb'

export class UserMongoAdapter implements IMongoInterfacesAdapter {

    async addUserRepository(data: AddUserParams): Promise<UserModel | boolean> {
        return MongoHelper.insertDocumentCollection(data, USER_COLLECTION);
    }

    async checkUserRepository(email: string): Promise<boolean> {
        return MongoHelper.loadDocumentByFieldCollection(EMAIL_PARAM, email, USER_COLLECTION)
    }

    async updateTokenRepository(id: string, value: string): Promise<void> {
       // return MongoHelper.updateDocumentCollection(id, value, ACCESS_TOKEN_PARAM, USER_COLLECTION)
        const accountCollection = await MongoHelper.getCollection(USER_COLLECTION)
        await accountCollection.updateOne({
            _id: id
        }, {
            $set: {
                accessToken: value
            }
        })
    }

    async loadUserByFieldRepository(value: string): Promise<ILoadUserByFieldRepository.Result> {
        return MongoHelper.loadDocumentByFieldCollection(EMAIL_PARAM, value, USER_COLLECTION)
    }

    async loadTokenRepository(token: string): Promise<ILoadAccountTokenRepository.Result> {
        //return MongoHelper.loadDocumentByFieldCollection('accessToken', token, USER_COLLECTION)
        const accountCollection = await MongoHelper.getCollection(USER_COLLECTION)
        const document = await accountCollection.findOne({_id: new ObjectId(token)})
        return document && MongoHelper.map(document)
    }
}
