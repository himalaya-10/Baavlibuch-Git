const express=require('express')
const router=express.Router()
const pwdUser=require('../schema/pwd')
const frndpwdUser=require('../schema/friendpwd')
const multer=require('multer')
// const storage = multer.memoryStorage();
const upload=multer({dest:'upload/'})

router.post("/pwd",upload.single('image'),async(req,res)=>{
    try{

        const { id, friendid, pass} = req.body;
        const { originalname, path, mimetype } = req.file;
        let userexist=await pwdUser.findOne({id:id})
        let friendexist=await frndpwdUser.findOne({id:id})

        if(userexist){
            // res.status(200).json({ message: 'user already exist!' });
        }
        else{
            const textEntry = new pwdUser({
                id,
                friendid,
                pass,
                image: {
                    name: originalname,
                    path: path,
                    contentType: mimetype
                },
                friendList:[
                    {
                        id:friendid
                    },

                ]

            });
            if(friendexist){
                const friendListObjects = friendexist.friendList;
                // console.log(friendListObjects)
                friendListObjects.forEach(friend => {
                    if(friend.id!=friendid){
                        
                        textEntry.friendList.push({
                                    id:friend.id
                                });
                    }
                    });
                await frndpwdUser.deleteOne({ id: id });
                
            }
            await textEntry.save();
            // res.status(200).json({ message: 'File inserted successfully' });

            //updata friendlist;

            let dbcheck = await pwdUser.findOne({ id: friendid });

            if (dbcheck) {
              await pwdUser.findOneAndUpdate(
                { "id": friendid },
                {
                  $addToSet: {
                    "friendList": { "id": id }
                  }
                },
                { new: true } // This option returns the modified document
              );
            } else {
                let frndexist=await frndpwdUser.findOne({id:friendid});
                if(frndexist){

                    await frndpwdUser.findOneAndUpdate(
                        { "id": friendid },
                        {
                          $addToSet: {
                            "friendList": { "id": id }
                          }
                        },
                        { new: true } 
                      );
                }
                else{
                    const frndup=new frndpwdUser({
                                id:friendid,
                                friendList:{
                                    id:id
                                }
                            })
                            await frndup.save();
                }

            }
            

            

        }

        /// Call Django API with the most recent two strings and return ngrams to frontend

        text1=id;
        text2=friendid
        const djangoApiUrl = `http://localhost:9000/api/get_ngrams/${encodeURIComponent(text1)}/${encodeURIComponent(text2)}`;
        try {
            const fetch = (await import('node-fetch')).default;
        
            const response = await fetch(djangoApiUrl);
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const ngramsData = await response.json();
            res.json({ ngramsData });
            // console.log('Ngrams data:', ngramsData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
    catch(error){
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
module.exports = router;