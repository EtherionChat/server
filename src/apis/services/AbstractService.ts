//create Abstract Class
export default abstract class AbstractService {
    constructor() {}
    /**
     * Create a new instance of the service
     * @param data:any
     * @returns Promise<any>
     */
    abstract create(data: any): Promise<any>;
    /**
     * Update an instance of the service
     * @param id:string
     * @param data:any
     * @returns Promise<any>
     */
    abstract update(user, body): Promise<any>;
    /**
     * Delete an instance of the service
     * @param id:string
     * @returns Promise<any>
     */
    abstract delete(id: string): Promise<any>;
    /**
     * Find all instances of the service
     * @param filter:any
     * @returns Promise<any>
     */
    abstract find(filter: any): Promise<any>;
    /**
     * Find one instance of the service
     * @param filter:any
     * @returns Promise<any>
     */
    abstract findOne(filter: any): Promise<any>;
    /**
     * Find one instance of the service by id
     * @param id:string
     * @returns Promise<any>
     */
    abstract findById(id: string): Promise<any>;
    /**
     * Find one instance of the service by id
     * @param id:string
     * @returns Promise<any>
     */
    abstract findByIdAndUpdate(id: string, data: any): Promise<any>;
    /**
     * Find one instance of the service by id
     * @param id:string
     * @returns Promise<any>
     */
    abstract findByIdAndDelete(id: string): Promise<any>;
    /**
     * Find one instance of the service by id
     * @param id:string
     * @returns Promise<any>
     */
    abstract findOneAndUpdate(filter: any, data: any): Promise<any>;
    /**
     * Create a new instance of the service
     * @param data:any
     * @returns Promise<any>
     */
    abstract findOneAndDelete(filter: any): Promise<any>;
    /**
     * Create a new instance of the service
     * @param data:any
     * @returns Promise<any>
     */
    abstract findOneAndReplace(filter: any, data: any): Promise<any>;
}
