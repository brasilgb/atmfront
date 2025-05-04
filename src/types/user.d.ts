export interface UserProps {
    id: string;
    organizationId: string;
    companyId: string;
    name     : string;
    email    : string;
    password : string;
    is_admin : boolean;
    status   : boolean;
    roles    : string;
    createdAt: string;
}