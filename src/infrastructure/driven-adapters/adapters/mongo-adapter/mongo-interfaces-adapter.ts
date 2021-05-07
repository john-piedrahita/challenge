import {IUserRepository} from "@/domain/models/gateways/user-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";
import {IUpdateTokenRepository} from "@/domain/models/gateways/update-generic-repository";

export interface IMongoInterfacesAdapter extends IUserRepository,
    ICheckUserByEmailRepository, IUpdateTokenRepository{
    
}
