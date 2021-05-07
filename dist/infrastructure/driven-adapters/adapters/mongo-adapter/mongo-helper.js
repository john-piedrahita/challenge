"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoHelper = void 0;
const mongodb_1 = require("mongodb");
const constants_1 = require("@/infrastructure/driven-adapters/helpers/constants");
exports.MongoHelper = {
    client: null,
    uri: null,
    async connect(uri) {
        this.uri = uri;
        this.client = await mongodb_1.MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    },
    async disconnect() {
        await this.client.close();
        this.client = null;
    },
    async getCollection(name) {
        var _a;
        if (!((_a = this.client) === null || _a === void 0 ? void 0 : _a.isConnected())) {
            await this.connect(this.uri);
        }
        return this.client.db().collection(name);
    },
    async insertDocumentCollection(data, collection) {
        return await exports.MongoHelper.queryCollection(constants_1.INSERT_DOCUMENT, data, collection);
    },
    async loadDocumentByFieldCollection(field, value, collection) {
        return await exports.MongoHelper.queryCollection(constants_1.LOAD_BY_FIELD, '', collection, field, value);
    },
    async updateDocumentCollection(id, value, field, collection) {
        return await exports.MongoHelper.queryCollection(constants_1.UPDATE_DOCUMENT, '', collection, field, value, '');
    },
    async queryCollection(type, data, collection, field, value, param) {
        const collectionResult = await exports.MongoHelper.getCollection(collection);
        switch (type) {
            case constants_1.INSERT_DOCUMENT:
                return this.insert(data, collectionResult);
            case constants_1.LOAD_BY_FIELD:
                return this.loadByField(field, value, collectionResult);
            case constants_1.UPDATE_DOCUMENT:
                return this.update(param, value, field, collectionResult);
        }
    },
    async insert(data, collectionResult) {
        const result = await collectionResult.insertOne(data);
        return result.ops[0] !== null;
    },
    async loadByField(field, value, collectionResult) {
        let objectFilter = {};
        objectFilter[field] = value;
        const document = await collectionResult.findOne(objectFilter);
        return document && exports.MongoHelper.map(document);
    },
    async update(param, value, field, collectionResult) {
        let objectFilter = {};
        objectFilter[field] = value;
        let objectQuery = {};
        objectQuery['$set'] = objectFilter;
        return await collectionResult.updateOne({ _id: param }, objectQuery);
    },
    map: (data) => {
        const { _id, ...rest } = data;
        return Object.assign({}, rest, { id: _id });
    },
};
//# sourceMappingURL=mongo-helper.js.map