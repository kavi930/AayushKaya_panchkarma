export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, therapy, preferredDate, preferredTime, isHomeTherapy, message } = req.body || {};

    if (!name || !phone || !therapy) {
      return res.status(400).json({ error: 'Name, phone number, and therapy are required.' });
    }

    const booking = {
      id: `AK-${Date.now().toString(36).toUpperCase()}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      therapy: String(therapy).trim(),
      preferredDate: preferredDate ? String(preferredDate).trim() : 'Flexible',
      preferredTime: preferredTime ? String(preferredTime).trim() : 'Flexible',
      isHomeTherapy: Boolean(isHomeTherapy),
      message: message ? String(message).trim() : undefined,
      createdAt: new Date().toISOString(),
      status: 'pending_confirmation',
    };

    const waText = encodeURIComponent(
      `*AyushKaya Therapy Request*\n\n` +
      `*Ref ID:* ${booking.id}\n` +
      `*Name:* ${booking.name}\n` +
      `*Phone:* ${booking.phone}\n` +
      `*Therapy:* ${booking.therapy}\n` +
      `*Session Type:* ${booking.isHomeTherapy ? 'Home Therapy (Roorkee)' : 'Clinic (Sainipuram, Roorkee)'}\n` +
      `*Date:* ${booking.preferredDate}\n` +
      `*Time:* ${booking.preferredTime}\n` +
      (booking.message ? `*Notes:* ${booking.message}\n` : '') +
      `\nPlease verify availability and confirm my session.`
    );

    const waLink = `https://wa.me/919058989193?text=${waText}`;

    return res.json({
      success: true,
      message: 'Booking request registered. Awaiting practitioner confirmation.',
      booking,
      whatsappLink: waLink,
    });
  } catch (err) {
    console.error('Serverless booking error:', err);
    return res.status(500).json({ error: 'Could not record booking request.' });
  }
}
