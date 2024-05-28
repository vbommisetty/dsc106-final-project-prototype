# Created by:
Liam Manatt, Ojas Vashistha, Vaibhav Bommisetty

# What we've done so far:
Our first attempt used mapbox.js and svelte. We used a .geojson file from [this repository](https://github.com/PublicaMundi/MappingAPI.git) to add a layer to the map. This layer would add interactivity in the form of a tooltip and change the colors of the states to reflect the amount of people leaving California for that state. For the migration data that we got we downloaded excel sheets from [the 2022 census](https://www.census.gov/data/tables/time-series/demo/geographic-mobility/state-to-state-migration.html), and edited them to be able to be used in python and turned them into csv files and then .json files. However, after we were able to make the Choropleth, we were having a lot of trouble with developing a tooltip that worked with mapbox. So we instead pivoted by using the .geojson file that we got from earlier to create svgs which we then colored and created the tooltip for. This worked and is now our final prototype. 

# What will be the most challenging part of the project to design:
We are planning on adding a scrolling component to this visualization so we can display trends of how people migrated to and from California. This would require us implementing a 
