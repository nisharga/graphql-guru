import { ZodError } from "zod";
import { IErrorSources } from "../interface/Error";
import { config } from "../config";
import { Prisma } from "@prisma/client";

class ErrorHandlers { 
    handleZodError(error: ZodError): {  // Define return type explicitly
        statusCode: number;
        success: boolean;
        message: string;
        errorSources: IErrorSources[];
        stack: string | null;
    } {
        const errorSources: IErrorSources[] = error.issues.map(issue => ({
            path: issue?.path[issue.path.length - 1],
            message: issue?.message,
        }));
        const statusCode = 400;

        return {
            statusCode,
            success: false,
            message: 'Zod Error',
            errorSources,
            stack: config.node_env === 'development' ? error?.stack : null,
        };
    }

    handleValidationError(error: Prisma.PrismaClientValidationError): {  // Define return type explicitly
        statusCode: number;
        success: boolean;
        message: string;
        errorSources: IErrorSources[];
    } {
        const errorSources: IErrorSources[] = [
            {
                path: '',
                message: error.message,
            },
        ];

        const statusCode = 400;
        return {
            statusCode,
            success: false,
            message: 'Validation Error',
            errorSources,
        };
    }

    handleDuplicateError(error: Prisma.PrismaClientKnownRequestError): {  // Define return type explicitly
        statusCode: number;
        success: boolean;
        message: string;
        errorSources: IErrorSources[];
    } {
        if (error.code !== 'P2002') {
            throw error;
        }

        // @ts-ignore 
        const errorSources: IErrorSources[] = error?.meta?.target.map((field: string) => ({
            path: field,
            message: `${field} already exists.`,
        }));

        const statusCode = 409;
        return {
            statusCode,
            success: false,
            message: 'Duplicate Entry Error',
            errorSources,
        };
    }

    handleCastError(error: Prisma.PrismaClientKnownRequestError): {  // Define return type explicitly
        statusCode: number;
        success: boolean;
        message: string;
        errorSources: IErrorSources[];
    } {
        if (error.code !== 'P2003') {
            throw error;
        }

        const errorSources: IErrorSources[] = [
            {
                path: '',
                message: 'Invalid data type provided.',
            },
        ];

        const statusCode = 400;
        return {
            statusCode,
            success: false,
            message: 'Cast Error',
            errorSources,
        };
    }
}

export const ErrorHandler = new ErrorHandlers();
