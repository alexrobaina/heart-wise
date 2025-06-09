export type contextPrompt = {
  relationshipStatus: string
  relationshipDuration: string
  partnerGender: string
  haveChildren: string
  childrenDetails: string
  livingTogether: string
  location: string
  challenges: string[]
  bothInterested: string
  triedTherapy: string
  consideringSeparation: string
  legalSupport: string
  expectations: string[]
  communicationTone: string
  receiveExercises: string
}

export const createContextPrompt = (data: contextPrompt) => `
## Relationship Context ##
- Status: ${data.relationshipStatus} (${data.relationshipDuration} years)
- Partner: ${data.partnerGender}
- Children: ${data.haveChildren === 'Sí' ? data.childrenDetails : 'None'}
- Living together: ${data.livingTogether}
- Location: ${data.location}

## Main Challenges ##
${data.challenges?.map((c: string) => `• ${c}`).join('\n') || 'None specified'}

## Therapy Background ##
- Both interested: ${data.bothInterested}
- Tried therapy before: ${data.triedTherapy}
- Considering separation: ${data.consideringSeparation}
- Legal support: ${data.legalSupport}

## User Expectations ##
${data.expectations?.map((e: string) => `• ${e}`).join('\n') || 'None specified'}

## Communication Preferences ##
- Tone: ${data.communicationTone}
- Wants exercises: ${data.receiveExercises}

Please provide tailored advice considering this context. Be empathetic and professional.
`
