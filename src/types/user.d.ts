export interface UserProps {
    id: string;
    OrganizationId: string;
    CompanyId: string;
    name     : string;
    email    : string;
    password : string;
    is_admin : boolean;
    roles    : boolean;
    status   : boolean;
    createdAt: string;
}