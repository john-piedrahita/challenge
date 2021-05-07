import {Collection, MongoClient} from "mongodb";
import {INSERT_DOCUMENT, LOAD_BY_FIELD} from "@/infrastructure/driven-adapters/helpers/constants";

export const MongoHelper = {
    client: null as MongoClient,
    uri: null as string,
    
    async connect(uri: string): Promise<void> {
       this.uri = uri
       this.client = await MongoClient.connect(uri, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       })
    },
    
    async disconnect(): Promise<void> {
        await this.client.close()
        this.client = null
    },

    async getCollection(name: string): Promise<Collection> {
        if (!this.client?.isConnected()) {
            await this.connect(this.uri)
        }
        return this.client.db().collection(name)
    },

    async insertDocumentCollection(data: any, collection: string): Promise<any> {
        return await MongoHelper.queryCollection(INSERT_DOCUMENT, data, collection)
    },

    async loadDocumentByFieldCollection(field: string, value: string, collection: string): Promise<any> {
        return await MongoHelper.queryCollection(LOAD_BY_FIELD, '', collection, field, value)
    },

    async queryCollection(type: string, data: any, collection: string, field?: string, value?: string) {
        const collectionResult = await MongoHelper.getCollection(collection)

        switch (type) {
            case INSERT_DOCUMENT:
                return this.insert(data, collectionResult)
            case LOAD_BY_FIELD:
                return this.loadByField(field, value, collectionResult)
        }
    },

    async insert(data, collectionResult) {
        const result = await collectionResult.insertOne(data)
        return result.ops[0] !== null
    },

    async loadByField(field, value, collectionResult) {
        let objectFilter = {}; objectFilter[field] = value
        const document = await collectionResult.findOne(objectFilter)
        return document && MongoHelper.map(document)
    },

    map: (data: any): any => {
        const { _id, ...rest } = data
        return Object.assign({}, rest, { id: _id })
    },
}
