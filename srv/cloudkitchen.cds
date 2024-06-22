using { com.restaurant.cloudkitchen as KitchenDB } from '../db/schema';
using {API_PRODUCT_SRV as productapi} from './external/API_PRODUCT_SRV';


service CloudKitchen @(requires: 'authenticated-user'){
    entity Kitchen @(restrict: [
        {grant: ['READ'],to:'CloudKitchenRead'},
        {grant:['WRITE'],to:'CloudKitchenWrite'},
        {grant:['DELETE'],to:'CloudKitchenDelete'}
    ]) as projection on KitchenDB.Kitchen;
    entity Products as projection on productapi.A_Product{
        Product,
        ProductType,
        ProductGroup,
        Division,
        to_Description
    }
    entity ProductLocal as projection on KitchenDB.ProductLocal;

    }

annotate CloudKitchen.Kitchen with @odata.draft.enabled;
annotate CloudKitchen.ProductLocal with @odata.draft.enabled;


annotate CloudKitchen.Kitchen with @(
    UI.LineItem:[
        {
            Value: name
        },
        {
            Value: address1
        },
        {
            Value: address2
        },
        {
            Value: city
        },
        {
            Value: state
        },
        {
            Value: pin_code
        },
    ],
     UI.FieldGroup #CloudKitchen : {
        $Type : 'UI.FieldGroupType',
        Data : [
        {
            Value: name
        },
        {
            Value: address1
        },
        {
            Value: address2
        },
        {
            Value: city
        },
        {
            Value: state
        },
        {
            Value: pin_code
        }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'KitchensFacet',
            Label : 'CloudKitchen',
            Target : '@UI.FieldGroup#CloudKitchen',
        },
    ],

);


annotate CloudKitchen.ProductLocal with @(
    UI.LineItem:[
        {
            Value: Product
        },
        {
            Value: ProductType
        },
        {
            Value: ProductGroup
        },
        {
            Value: Division
        },
        {
            Value: ProductDescription
        },
    ],
     UI.FieldGroup #ProductLocal : {
        $Type : 'UI.FieldGroupType',
        Data : [
       {
            Value: Product
        },
        {
            Value: ProductType
        },
        {
            Value: ProductGroup
        },
        {
            Value: Division
        },
        {
            Value: ProductDescription
        },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'KitchensFacet',
            Label : 'CloudKitchen',
            Target : '@UI.FieldGroup#ProductLocal',
        },
    ],

);







