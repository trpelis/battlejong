//type deklaracija za import slika kao modula da se ne koristi require()
declare module "*.png" {
    const value: any;
    export = value;
}