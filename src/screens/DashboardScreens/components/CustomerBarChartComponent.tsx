import { Column } from '@ant-design/plots';

interface Referral {
  // Define the structure of each referral object
  // Example properties:
  uid: string;
  createdAt: string;
  email: string;
  referee: string;
  firstName: string;
  secondName: string;
  updatedAt: string;


  // ...
}

const CustomerBarChartComponent = ({ referrals }: { referrals: Referral[] }) => {
  
  const data = [];
 
  if (referrals) {
    console.log(referrals)
    const dateSalesMap = new Map(); // Map to store the date and corresponding sales count
  
    // Iterate through referrals to count sales for each date
    for (let index = 0; index < referrals.length; index++) {
      const element = referrals[index];
      console.log(element)
      const createdAt = element.createdAt;
  
      if (typeof createdAt === 'string') {
        const date = createdAt.split('T')[0]; // Extract the date from the datetime string
  
        // Increment the sales count for the corresponding date
        if (dateSalesMap.has(date)) {
          dateSalesMap.set(date, dateSalesMap.get(date) + 1);
        } else {
          dateSalesMap.set(date, 1);
        }
      }
    }
  
    // Push the date and sales count to the data array
    for (const [date, sales] of dateSalesMap.entries()) {
      data.push({ type: date, sales });
    }
  }

  console.log("column chart ",data)
  
  
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return <Column {...config} />;
};

export default CustomerBarChartComponent;
