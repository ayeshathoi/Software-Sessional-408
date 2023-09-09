/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {useEffect, useState, ChangeEvent, FormEvent } from 'react';

import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/headerdoctor';
import Footer from '../navbar/footer';
import { reg_hospital,hospital_name_list } from '@/api/apiCalls';

function HospitalSignup() {
  const navigate = useNavigate();
  const [hospitalList, setHospitalNames] = useState<string[]>([]);

  useEffect(() => {
    hospital_name_list().then((res) => {
      setHospitalNames(res.result);
    });
  }, []);
  const [formData, setFormData] = useState({
    hospital_name: '',
    email: '',
    password: '',
    mobile: '',
    street: '',
    thana: '',
    city: '',
    district: '',
    reg_id: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      if (formData.hospital_name.length < 3) {
        alert('Hospital name should be at least 3 characters.');
      }
      else if (formData.password.length != 4) {
        alert('Password should be 4 characters.');
      }
      else if (!/^\d+$/.test(formData.reg_id)) {
        alert('Registration Id should contain numbers only.');
      }
      else if (formData.reg_id.length < 3) {
        alert('Registration Id should be at least 3 digits.');
      }
      else if (formData.street.length < 3) {
        alert('Street name should be at least 3 characters.');
      }
      else if (formData.thana.length < 3) {
        alert('Thana name should be at least 3 characters.');
      }
      else if (formData.city.length < 3) {
        alert('City name should be at least 3 characters.');
      }
      else if (formData.district.length < 3) {
        alert('District name should be at least 3 characters.');
      }
      else if (formData.mobile.length !== 11) {
        alert('Mobile number should be 11 digits.');
      }
      else if (!/^\d+$/.test(formData.mobile)) {
        alert('Mobile number should contain numbers only.');
      }
      else {

      const ret = reg_hospital(formData);
      if(ret)
      {
      alert ('Registration Successful');
      navigate('/LogIn');
      }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
        className="flex flex-col items-center justify-center mt-36"
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          // opacity: 0.5, // Adjust the opacity as needed (0.0 to 1.0)
        }}
      >
        <div className="pt-20 flex flex-col items-center justify-center pb-8 px-12 mb-8 border border-gray-300 round-lg ">
          <h1 style={{ fontWeight: 'bold', fontSize: '24px', color: 'green' }}>
            Hospital Signup
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4"
          >
            {/* <TextField
              label="Hospital Name"
              name="hospital_name"
              value={formData.hospital_name}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            /> */}
            <select name="hospital_name" value={formData.hospital_name} onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent">
              <option value="hospital_name">Hospital Name</option>
              <option value="DMC">DMC</option>
              <option value="CMH">CMH</option>
              <option value="BSMMU">BSMMU</option>
              <option value="Apollo">Apollo</option>
              <option value="Square">Square</option>
              <option value="Labaid">Labaid</option>
              <option value="United">United</option>
              <option value="Popular">Popular</option>
              <option value="Ibn-Sina">Ibn-Sina</option>
              <option value="Green-Life">Green-Life</option>
              <option value="Evercare">Evercare</option>
              <option value="Anwar-Khan">Anwar-Khan</option>
              <option value="Ibrahim Cardiac">Ibrahim Cardiac</option>
              <option value="Al-Raji">Al-Raji</option>
              <option value="Al-Markazul">Al-Markazul</option>
              <option value="Al-Helal">Al-Helal</option>
              </select>
            <TextField
              label="Registration ID"
              name="reg_id"
              value={formData.reg_id}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />

            <TextField
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            />
            {/* <TextField
              label="Thana"
              name="thana"
              value={formData.thana}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            /> */}
             <select name="thana" value={formData.thana} onChange={handleChange} 
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent">
              <option value="thana">Thana</option>
              <option value="Adabor">Adabor</option>
              <option value="Badda">Badda</option>
              <option value="Bangshal">Bangshal</option>
              <option value="Bimanbandar">Bimanbandar</option>
              <option value="Cantonment">Cantonment</option>
              <option value="Chakbazar">Chakbazar</option>
              <option value="Darus Salam">Darus Salam</option>
              <option value="Demra">Demra</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Gendaria">Gendaria</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Hazaribagh">Hazaribagh</option>
              <option value="Jatrabari">Jatrabari</option>
              <option value="Kadamtali">Kadamtali</option>
              <option value="Kafrul">Kafrul</option>
              <option value="Kalabagan">Kalabagan</option>
              <option value="Kamrangirchar">Kamrangirchar</option>
              <option value="Khilgaon">Khilgaon</option>
              <option value="Khilkhet">Khilkhet</option>
              <option value="Kotwali">Kotwali</option>
              <option value="Lalbagh">Lalbagh</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Mohammadpur">Mohammadpur</option>
              <option value="Motijheel">Motijheel</option>
              <option value="New Market">New Market</option>
              <option value="Pallabi">Pallabi</option>
              <option value="Paltan">Paltan</option>
              <option value="Palashi">Palashi</option>
              <option value="Panthapath">Panthapath</option>
              <option value="Ramna">Ramna</option>
              <option value="Rampura">Rampura</option>
              <option value="Sabujbagh">Sabujbagh</option>
              <option value="Shah Ali">Shah Ali</option>
              <option value="Shahbagh">Shahbagh</option>
              <option value="Sher-e-Bangla Nagar">Sher-e-Bangla Nagar</option>
              <option value="Shyampur">Shyampur</option>
              <option value="Sutrapur">Sutrapur</option>
              <option value="Tejgaon">Tejgaon</option>
              <option value="Tejgaon Industrial Area">Tejgaon Industrial Area</option>
              <option value="Turag">Turag</option>
              <option value="Uttar Khan">Uttar Khan</option>
              <option value="Uttara">Uttara</option>
              <option value="Vatara">Vatara</option>
              <option value="Wari">Wari</option>
            </select>
            {/* <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            /> */}
            <select name="city" value={formData.city} onChange={handleChange} 
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent">
              <option value="city">City</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Comilla">Comilla</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Barishal">Barishal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
            {/* <TextField
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              variant="outlined"
              required
              className="w-full"
            /> */}
            <select name="district" value={formData.district} onChange={handleChange} 
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent">
              <option value="district">District</option>
              <option value="Bagerhat">Bagerhat</option>
              <option value="Bandarban">Bandarban</option>
              <option value="Barguna">Barguna</option>
              <option value="Barishal">Barishal</option>
              <option value="Bhola">Bhola</option>
              <option value="Bogra">Bogra</option>
              <option value="Brahmanbaria">Brahmanbaria</option>
              <option value="Chandpur">Chandpur</option>
              <option value="Chapainawabganj">Chapainawabganj</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Chuadanga">Chuadanga</option>
              <option value="Cox's Bazar">Cox's Bazar</option>
              <option value="Cumilla">Cumilla</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Dinajpur">Dinajpur</option>
              <option value="Faridpur">Faridpur</option>
              <option value="Feni">Feni</option>
              <option value="Gaibandha">Gaibandha</option>
              <option value="Gazipur">Gazipur</option>
              <option value="Gopalganj">Gopalganj</option>
              <option value="Habiganj">Habiganj</option>
              <option value="Jamalpur">Jamalpur</option>
              <option value="Jashore">Jashore</option>
              <option value="Jhalakathi">Jhalakathi</option>
              <option value="Jhenaidah">Jhenaidah</option>
              <option value="Joypurhat">Joypurhat</option>
              <option value="Khagrachhari">Khagrachhari</option>
              <option value="Khulna">Khulna</option>
              <option value="Kishoreganj">Kishoreganj</option>
              <option value="Kurigram">Kurigram</option>
              <option value="Kushtia">Kushtia</option>
              <option value="Lakshmipur">Lakshmipur</option>
              <option value="Lalmonirhat">Lalmonirhat</option>
              <option value="Madaripur">Madaripur</option>
              <option value="Magura">Magura</option>
              <option value="Manikganj">Manikganj</option>
              <option value="Meherpur">Meherpur</option>
              <option value="Moulvibazar">Moulvibazar</option>
              <option value="Munshiganj">Munshiganj</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Naogaon">Naogaon</option>
              <option value="Narail">Narail</option>
              <option value="Narayanganj">Narayanganj</option>
              <option value="Narsingdi">Narsingdi</option>
              <option value="Natore">Natore</option>
              <option value="Netrokona">Netrokona</option>
              <option value="Nilphamari">Nilphamari</option>
              <option value="Noakhali">Noakhali</option>
              <option value="Pabna">Pabna</option>
              <option value="Panchagarh">Panchagarh</option>
              <option value="Patuakhali">Patuakhali</option>
              <option value="Pirojpur">Pirojpur</option>
              <option value="Rajbari">Rajbari</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Rangamati">Rangamati</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Satkhira">Satkhira</option>
              <option value="Shariatpur">Shariatpur</option>
              <option value="Sherpur">Sherpur</option>
              <option value="Sirajganj">Sirajganj</option>
              <option value="Sunamganj">Sunamganj</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Tangail">Tangail</option>
              <option value="Thakurgaon">Thakurgaon</option>
            </select>
            <div className="col-span-2 flex justify-center">
              <Button type="submit" variant="contained" color="success">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}

export default HospitalSignup;
