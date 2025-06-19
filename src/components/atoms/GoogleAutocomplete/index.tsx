// src/components/atoms/GoogleAutocomplete/index.tsx
import { FC, useState, useEffect } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import PlacesAutocomplete from 'react-places-autocomplete'
import { useJsApiLoader } from '@react-google-maps/api'

interface Props {
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  showAddress?: boolean
}

const libraries = ['places']

export const GoogleAutocomplete: FC<Props> = ({
  value = '',
  onChange,
  error,
  showAddress,
  placeholder = 'Buscar ubicación',
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
    libraries,
    language: 'es',
  })

  const [address, setAddress] = useState(value)

  // Keep local state in sync with parent
  useEffect(() => {
    setAddress(value || '')
  }, [value])

  const handleChange = (val: string) => {
    setAddress(val)
    onChange(val)
  }

  const handleSelect = (val: string) => {
    setAddress(val)
    onChange(val)
  }

  if (loadError) return <div>Error loading Google Maps API</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="relative">
            <input
              className={`block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-400 outline-none
                   placeholder:text-neutral-500 focus:ring-primary-300 sm:text-sm sm:leading-6 pl-4`}
              {...getInputProps({ placeholder })}
            />
            {showAddress && address && (
              <div className="flex gap-2 mt-2">
                <div style={{ width: 22 }}>
                  <FaMapLocationDot />
                </div>
                <p className="text-primary-900">{address}</p>
              </div>
            )}
            <div className="absolute flex flex-col w-full rounded-md shadow-lg bg-primary-50 mt-2 z-[50]">
              {loading && <div className="w-full h-14 p-4">Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const style = suggestion.active
                  ? { backgroundColor: '#ace3d3' }
                  : { backgroundColor: '#ffffff' }
                return (
                  <div
                    className="cursor-pointer text-primary-900 p-4 rounded-md"
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={index}
                  >
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  )
}
