import { Component } from '@angular/core';
import { AppArray } from '../app/app.array';
import { Mapper } from './mapper.component';
//import * as THREE  from 'three';
//import { OrbitControls } from 'three-orbitcontrols-ts';

export class GSJSON2Threejs implements Mapper {

	constructor() {

   }

	map(gsjson:any) {


/*	let jsonString ={
    "metadata": {
        "filetype":"mobius",
        "version": 1.0,
        "schema":"xxx",
        "crs": {"epsg":3857},
        "location": "+40.6894-074.0447" 
    },
    "geometry":{
        "counts":[8, 24, 24, 6, 6, 6],
        "entities":[
        	[],
        	[],
        	[
        		[200, [[1, 5, 4, 0]], []],
        		[200, [[2, 6, 5, 1]], []],

                [200, [[3, 7, 6, 2]], []],
                [200, [[0, 4, 7, 3]], []],
                [200, [[2, 1, 0, 3]], []],
                [200, [[5, 6, 7, 4]], []]
        	]
        ]
       },
        "semantics":{
        "attributes":{
            "name":"position",
            "topology":"points",
            "values": [
                [[-7.400000095367432, -1.6922199726104736, 0.0], [0]],
                [[7.400000095367432, -1.6922199726104736, 0.0], [1]],
                [[7.400000095367432, -1.6922199726104736, 7.0], [2]],
                [[-7.400000095367432, -1.6922199726104736, 7.0], [3]],
                [[-7.400000095367432, -0.6922200322151184, 0.0], [4]],
                [[7.400000095367432, -0.6922200322151184, 0.0], [5]],
                [[7.400000095367432, -0.6922200322151184, 7.0], [6]],
                [[-7.400000095367432, -0.6922200322151184, 7.0], [7]],
            ]
        }
    }

};*/
	let jsonString ={
    "metadata": {
        "filetype":"mobius",
        "version": 1.0,
        "schema":"xxx",
        "crs": {"epsg":3857},
        "location": "+40.6894-074.0447" 
    },
    "geometry":{
        "counts":[8, 24, 24, 6, 6, 6],
        "entities":[
            [],
            [],
            [
                [200, [[1, 5, 4, 0]], []],
                [200, [[2, 6, 5, 1]], []],
                [200, [[3, 7, 6, 2]], []],
                [200, [[0, 4, 7, 3]], []],
                [200, [[2, 1, 0, 3]], []],
                [200, [[5, 6, 7, 4]], []],
            ]
        ]
    },
    "semantics":{
        "attributes":{
            "name":"position",
            "topology":"points",
            "map": [0,1,2,3,4,5,6,7],
            "values": [
                [-7.400000095367432, -1.6922199726104736, 0.0],
                [7.400000095367432, -1.6922199726104736, 0.0],
                [7.400000095367432, -1.6922199726104736, 7.0],
                [-7.400000095367432, -1.6922199726104736, 7.0],
                [-7.400000095367432, -0.6922200322151184, 0.0],
                [7.400000095367432, -0.6922200322151184, 0.0],
                [7.400000095367432, -0.6922200322151184, 7.0],
                [-7.400000095367432, -0.6922200322151184, 7.0]
            ],
            "name1":"test1",
            "topology1":"points",
            "values1": [
                [641.6005859375, [0]],
                [800.4638061523438, [1]],
                [510.89501953125, [2]],
                [775.4743041992188, [3]],
                [879.505859375, [4]],
                [205.04010009765625, [5]],
                [522.0606079101562, [6]],
                [885.0562744140625, [7]],
            ],
            "name2":"test2",
            "topology2":"vertices",
            "values2": [
                ["id_0", [0, 4, 8, 12, 16, 20]],
                ["id_1", [1, 5, 9, 13, 17, 21]],
                ["id_2", [2, 6, 10, 14, 18, 22]],
                ["id_3", [3, 7, 11, 15, 19, 23]],
            ],
            "name3":"test3",
            "topology3":"faces",
            "values3": [
                [2.0, [0]],
                [12.0, [1]],
                [22.0, [2]],
                [32.0, [3]],
                [42.0, [4]],
                [52.0, [5]],
            ]
        }
    }
};


	var entitiesData = jsonString.geometry.entities[2];
	var positionData = [];
	var itemSize = 0;
	for(var i=0; i<entitiesData.length;i++) {
		var positionArray = entitiesData[i][1][0];
		for(var j=0; j<positionArray.length; j++) {
			var pointsetsItem = positionArray[j];
			var mapValue = jsonString.semantics.attributes.map[pointsetsItem];
			var positionVaule = jsonString.semantics.attributes.values[mapValue];
			var itemSize :number = positionVaule.length;
			positionData.push(positionVaule[0]);
			positionData.push(positionVaule[1]);
			positionData.push(positionVaule[2]);	
		}
	}
	var metadata = {
		"filetype": jsonString.metadata.filetype,
		"version": jsonString.metadata.version,
		"schema": jsonString.metadata.schema,
		"crs": jsonString.metadata.crs.epsg,
		"location": jsonString.metadata.location,
		"type": "BufferGeometry"  
	};
	var data = {
		"attributes": {
			"itemSize": itemSize,
			"type": "Float32Array",
			"array": positionData

		}
	};

	var obj = {
		"metadata": metadata,
		"data": data
	};

	console.log(obj)
	return JSON.stringify(obj)


	}
}
