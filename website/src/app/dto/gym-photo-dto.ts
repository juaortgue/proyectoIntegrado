export class GymCreatePhotoDto {
    name: string;
    address: string;
    price: number;
    province: string;
    city: string;
    zipcode: string;
    description: string;
    position: string;

    constructor(name: string, address: string, price: number, city: string, zipcode: string,
        description: string, position: string, province: string) {
        this.name = name;
        this.address = address;
        this.price = price;
        this.province=province;
        this.city=city;
        this.zipcode=zipcode;
        this.description=description;
        this.position=position;
    }
}
            