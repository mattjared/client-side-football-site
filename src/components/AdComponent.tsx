'use client';

import { Card, CardContent } from './ui/card'

export function AdComponent({ title, content }: { title: string; content: string }) {
    return (
      <Card className="mb-4 bg-primary text-primary-foreground">
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p>{content}</p>
        </CardContent>
      </Card>
    )
  }