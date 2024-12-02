import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const createIssueSchema = z.object({
    'title': z.string().min(1).max(255),
    'description': z.string().min(1)
})

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json(); // Attempt to parse the body
        const validation = createIssueSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.errors.map((err) => ({ path: err.path, message: err.message })) },
                { status: 400 }
            );
        }

        const newIssue = await prisma.issue.create({
            data: {
                title: validation.data.title,
                description: validation.data.description,
            },
        });

        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ message: "Invalid JSON or internal server error" }, { status: 500 });
    }
};
