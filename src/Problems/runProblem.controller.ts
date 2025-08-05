import { Request, Response } from "express";
import languageMapper from "../utils/judge0LanguageMapper";
import axios from "axios";
import { codeRunnerIP } from "..";

const runProblem = async(req: Request, res: Response) => {
    const {code, language, inputs}:{code: string, language: string, inputs: string[]} = req.body;
    const languageCode = languageMapper[language];
    const responseData: string[] = []
    for(const input of inputs){
        const { data } = await axios.post(`http://${codeRunnerIP}:2358/submissions?base64_encoded=false&wait=true`, {
            source_code: code,
            language_id: languageCode,
            stdin: input
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(data);
        if(data.stdout){
            responseData.push(data.stdout)
        }
        else{
            responseData.push(data.stderr || data.compile_output || 'Runtime Error')
        }
    }
    res.status(200).json({
        outputs: responseData
    });
}

export default runProblem