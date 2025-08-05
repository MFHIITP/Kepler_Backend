import { Request, Response } from "express";
import { problemSet } from "../problemSet";

const getProblem = async(req: Request, res: Response) => {
    const index = new Date().getDate();
    const problem = problemSet.find(problem => problem.id == index);
    if(!problem){
        res.status(405).send("Problem Not Found")
        return;
    }
    const {hiddenTestCases, ...sendingProblem} = problem;
    res.status(202).json(sendingProblem)
}
export default getProblem