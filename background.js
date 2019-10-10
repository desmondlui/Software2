(async function () {
    "use strict";

    //TODO: Hide if the default search engine is already google?
    //There's no listener methods available for browser.search so right now it would need to be loop based, which isn't great.
    //async function searchCheck() {
    //    let search = (await browser.search.get()).find(_ => _.isDefault).name;
    //    if (search === "Google") //Can it ever be called something else?
    //        ;//Remove context menu item
    //    else
    //        ;//Add context menu item
    //}
    //var interval = setInterval(searchCheck, 1000);

    browser.menus.create({
        id: "search-google",
        title: "Search &Google for \"%s\"",
        contexts: ["selection"]
    });

    browser.menus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId !== "search-google" || !info.selectionText)
            return;

        let index;
        let newTabPosition = await browser.browserSettings.newTabPosition.get({});
        if (newTabPosition.value !== "atEnd") {
            index = tab.index + 1;
        }

        let url = new URL("https://www.google.com/search");
        url.searchParams.set("q", info.selectionText.trim());

        await browser.tabs.create({
            index: index,
            url: url.href
        });
    });



    browser.menus.create({
        id: "search-youtube",
        title: "Search &Youtube for \"%s\"",
        contexts: ["selection"]
    });

    browser.menus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId !== "search-youtube" || !info.selectionText)
            return;

        let index;
        let newTabPosition = await browser.browserSettings.newTabPosition.get({});
        if (newTabPosition.value !== "atEnd") {
            index = tab.index + 1;
        }

        let url = new URL("https://www.youtube.com/search");
        url.searchParams.set("q", info.selectionText.trim());

        await browser.tabs.create({
            index: index,
            url: url.href
        });
    });

}());