import {IUserRepository} from "@/domain/models/gateways/user-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";
import {IUpdateTokenRepository} from "@/domain/models/gateways/update-generic-repository";
import {ILoadUserByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {ILoadAccountTokenRepository} from "@/domain/models/gateways/load-account-token-repository";

export interface IMongoInterfacesAdapter extends IUserRepository,
    ICheckUserByEmailRepository, IUpdateTokenRepository,
    ILoadUserByFieldRepository, ILoadAccountTokenRepository{
    
}
