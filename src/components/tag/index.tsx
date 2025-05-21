import Image from 'next/image'

type TagProps = {
  icon?: string
  category: string
  primaryColor: string
  secondaryColor: string
}

export default function Tag({
  icon,
  category,
  primaryColor,
  secondaryColor,
}: TagProps) {
  return (
    <div
      className={`flex items-center gap-1.5 py-2 px-4 rounded-[2rem]`}
      style={{ background: secondaryColor }}
    >
      {icon ? (
        <Image
          src={icon}
          alt="Category Item"
          width={16}
          height={16}
          style={{ width: '16px', height: '16px' }}
        />
      ) : null}
      <p style={{ color: primaryColor }} className="text-xs">
        {category}
      </p>
    </div>
  )
}
