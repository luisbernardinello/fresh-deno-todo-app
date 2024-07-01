import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { db } from "../../../utils/dbConnection.ts";

const TodosCollection = db.collection("Todos");

export const handler :Handlers ={
    async POST (req,_){
        try {
            const {todo} = await req.json();
            await TodosCollection.insertOne({todo:todo, status:0});
        
            return new Response(null,{
                status:STATUS_CODE.Created
            })
        } catch (error) {
            return new Response(error);
        }
    },
    async GET(req, _) {
        try {
            const todos = await TodosCollection.find().toArray();
            return new Response(JSON.stringify(todos), {
                status: STATUS_CODE.OK,
                statusText: "Get Todos sucessfully.",
            });
        } catch (error) {
            return new Response(error);
        }
    },

    async PUT(req, _) {
        try {
            const {id, text} = await req.json();
            await TodosCollection.updateOne(
                {_id: new ObjectId(id)},
                {$set:{todo:text}}
            ) 
            return new Response(null, {
                status: STATUS_CODE.OK,
            });
        } catch (error) {
            return new Response(error);
        }
    },

    async DELETE(req, _) {
        try {
            const {id} = await req.json();
            await TodosCollection.delete({_id: new ObjectId(id)});
            return new Response(null, {
                status: STATUS_CODE.OK,
            })
        } catch (error) {
            return new Response(error);
        }
    },

    async PATCH(req, _) {
        try {
            const { id, status } = await req.json();
            await TodosCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { status } },
            );
            return new Response(null, {
                status: STATUS_CODE.OK,
            });
        } catch (error) {
            return new Response(error);
        }
    }
    


}