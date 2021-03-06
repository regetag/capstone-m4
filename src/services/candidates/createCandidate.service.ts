import { ICandidateCreate } from "../../interfaces/candidate";
import { prisma } from "../../prisma/client";

const candidateCreateService = async ({ userId, jobId }: ICandidateCreate) => {

  const candidate = await prisma.candidate.create({
    data: { jobId, userId },
  });

  return candidate;
};

export default candidateCreateService;
