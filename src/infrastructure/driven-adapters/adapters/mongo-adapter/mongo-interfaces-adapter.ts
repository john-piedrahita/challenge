import {IUserRepository} from "@/domain/models/gateways/user-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";

export interface IMongoInterfacesAdapter extends IUserRepository, ICheckUserByEmailRepository{
    
}
