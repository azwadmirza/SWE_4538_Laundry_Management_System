export const handleStatusColor=(orderStatus:string,setStatusColor:React.Dispatch<React.SetStateAction<string>>,setStatus:React.Dispatch<React.SetStateAction<string>>)=>{
  if (orderStatus === "Paid") {
    setStatusColor('warning');
    setStatus("Paid");
  }
  else if (orderStatus === 'Paying') {
    setStatusColor('primary');
    setStatus('Paying');
  }
  else if (orderStatus === 'Approved') {
    setStatusColor('info');
    setStatus('Approved');
  }
  else if (orderStatus === 'Ready') {
    setStatusColor('secondary');
    setStatus('Ready');
  }
  else if (orderStatus === 'Completed') {
    setStatusColor('success');
    setStatus('Completed');
  }
  else if (orderStatus === 'Cancelled') {
    setStatusColor('danger');
    setStatus('Cancelled');
  }
  else if (orderStatus === 'Pending') {
    setStatusColor('dark');
    setStatus('Pending');
  }
  else{
    setStatusColor('danger');
    setStatus('Error');
  }
}