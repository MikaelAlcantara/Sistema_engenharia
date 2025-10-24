import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, X, Edit2 } from "lucide-react"

interface EditableCellProps {
  value: string
  onSave: (newValue: string) => void
  placeholder?: string
  className?: string
  multiline?: boolean
}

export function EditableCell({ value, onSave, placeholder, className = "", multiline = false }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

  const handleSave = () => {
    onSave(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder={placeholder}
          className={`h-8 ${className}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !multiline) {
              handleSave()
            } else if (e.key === 'Escape') {
              handleCancel()
            }
          }}
          autoFocus
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          className="h-8 w-8 p-0"
        >
          <Check className="h-3 w-3 text-success" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          className="h-8 w-8 p-0"
        >
          <X className="h-3 w-3 text-destructive" />
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`group flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded ${className}`}
      onClick={() => setIsEditing(true)}
    >
      <span className="flex-1">{value || placeholder}</span>
      <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
    </div>
  )
}