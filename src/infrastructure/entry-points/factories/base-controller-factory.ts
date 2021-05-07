import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {AddUserController} from "@/infrastructure/entry-points/api/add-user-controller";
import {makeDbAddUserFactory} from "@/infrastructure/driven-adapters/factories/db-add-user-factory";
import {ADD_USER} from "@/infrastructure/helpers/constant";

export const makeBaseControllerFactory = (type: string): IController => {
    switch (type) {
        case ADD_USER:
            return new AddUserController(makeDbAddUserFactory())
    }
}
