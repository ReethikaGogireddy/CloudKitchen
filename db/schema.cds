namespace com.restaurant.cloudkitchen;
using  {managed, cuid} from '@sap/cds/common';

entity Kitchen:cuid,managed
{
 @title :'Name'
 name: String(40); 
 @title :'Address 1'
 address1: String(100);
 @title :'Address 2'
 address2: String(100);
 @title :'City'
 city: String(50);
 @title :'State'
 state: String(50);
 @title :'PIN code'
 pin_code : String(10);
}




