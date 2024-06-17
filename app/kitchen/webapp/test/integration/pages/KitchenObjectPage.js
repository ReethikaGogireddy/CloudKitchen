sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.restaurant.cloudkitchen.kitchen',
            componentId: 'KitchenObjectPage',
            contextPath: '/Kitchen'
        },
        CustomPageDefinitions
    );
});