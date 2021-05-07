import {Request, Response, Router} from "express";
import {adaptRoute} from "@/application/config/express-router-adapter";
import {makeBaseControllerFactory} from "@/infrastructure/entry-points/factories/base-controller-factory";
import {ADD_USER, LOGIN} from "@/infrastructure/helpers/constant";

/**
 * Base router "/api/v1"
 * @param router
 */
export default (router: Router): void => {
    router.get('/', (req: Request, res: Response) => {
        res.json("Welcome to the world of clean architecture.")
    })

    router.post('/account', adaptRoute(makeBaseControllerFactory(ADD_USER)))
    router.post('/login', adaptRoute(makeBaseControllerFactory(LOGIN)))
}
