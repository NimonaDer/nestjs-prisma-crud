import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import  { Task} from "@prisma/client";

@Injectable()
export class TaskService {

   constructor(private prisma: PrismaService) {}

   async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
   }

  async getTaskById(id: number): Promise<Task> {
     const response = await this.prisma.task.findUnique({
          where: {
             id
           }
    })
    
    if(!response) {
        throw new NotFoundException('TASK WITH iD NOT FOUND')
    }
    return response;

   }

    async createTask(data: Task): Promise<Task> {
        return this.prisma.task.create({
                data
        });
    }

    async updateTask(id: number, data): Promise<Task> {
        return this.prisma.task.update({

            where:{
                id
            },
            data
        })
    }

    async deleteTask(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where:{
                id
            }
        });
    }

}