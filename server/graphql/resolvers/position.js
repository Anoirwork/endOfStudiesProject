const Position = require("../../model/position");
const kid = require("../../model/kid");

module.exports = {
  savePos: async args => {
    const pos = new Postion({
      lat: args.data.lat,
      lng: args.data.lng,
      kidNumb: args.data.kidNumb
    });
    const result = await pos.save();
    return {
      _id: result._id
    };
  },
  retrivePos: async args => {
    try {
      console.log(args)
      let now = Date.now()
        .toString()
        .substring(0, 8);
      /*const pos = await Position.findOne(
        {
          currentTime: now + 1
        },
        function(obj) {
          console.log("eni mel func heh : " + obj);
        }
      );
      const pos = await Position.find({})
        .sort({ $natural: -1 })
        .limit(1);*/

      const pos =  Position.aggregate(
          [ 
            {
               $match : { kidNumb : args.a } 
            } 
          ]
      );
      return pos;
    } catch (err) {
      throw new Error(err);//Error('"{ message: "Pos not found a bob", statusCode: 333 }"');
    }
  },
  retriveLastRoad: async args => {
    try {
      /*const road = await Position.find({})
        .sort({ $natural: -1 })
        .limit(20);*/
      const road = await Position
                    .find({ kidNumb: args.kidNumb })
                    //.sort({ $natural: -1 })
                    //.limit(20);
        //.aggregate([ { $match : { kidNumb : args.kidNumb } } ])//.find({ kidNumb : args.kidNumb })
        
        
      //console.log(road, args.kidNumb, "This is it ");
      return road;
    } catch (err) {
      throw new Error(err);
    }
  },
 
};
