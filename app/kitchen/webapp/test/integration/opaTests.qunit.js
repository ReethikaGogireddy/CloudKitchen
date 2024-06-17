sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/restaurant/cloudkitchen/kitchen/test/integration/FirstJourney',
		'com/restaurant/cloudkitchen/kitchen/test/integration/pages/KitchenList',
		'com/restaurant/cloudkitchen/kitchen/test/integration/pages/KitchenObjectPage'
    ],
    function(JourneyRunner, opaJourney, KitchenList, KitchenObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/restaurant/cloudkitchen/kitchen') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheKitchenList: KitchenList,
					onTheKitchenObjectPage: KitchenObjectPage
                }
            },
            opaJourney.run
        );
    }
);