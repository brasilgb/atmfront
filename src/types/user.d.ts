export interface UserProps {
    id: string;
    OrganizationId: string;
    CompanyId: string;
    name     : string;
    email    : string;
    password : string;
    is_admin : boolean;
    status   : boolean;
    roles    : string;
    createdAt: string;
}