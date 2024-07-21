import prisma from "../prismaClient.js";
import sendEmail from "../utils/emailUtils.js";

export const createReferral = async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, course } =
    req.body;

  try {
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        course,
      },
    });

    await sendEmail(
      refereeEmail,
      "Referral Confirmation",
      `Thank you for your referral! Details:\n\nReferrer: ${referrerName} (${referrerEmail})\nReferee: ${refereeName} (${refereeEmail})\nCourse: ${course}`
    );

    res.status(200).json(referral);
  } catch (error) {
    console.error("Error creating referral:", error);
    res.status(500).json({ error: "Failed to create referral" });
  }
};
