interface MyFormattedDateProps {
  dateString?: string;
  className?: string;
}

function MyFormattedDate({ dateString, className }: MyFormattedDateProps) {
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString(undefined, options);
  };

  return <span className={className}>{formatDate(dateString)}</span>;
}

export default MyFormattedDate;
