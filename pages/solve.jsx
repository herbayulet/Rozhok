import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

// export const getServerSideProps = async () => {
//   const resProv = await axios.get(
//     "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
//   );
//   const provinsi = resProv.data.provinsi;
//   return {
//     props: {
//       provinsi: provinsi,
//     },
//   };
// };

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [no_telp, setNo_Telp] = useState("");
  const [dataProvinsi, setDataProvinsi] = useState("");
  const [dataKota, setDataKota] = useState("");
  const [dataKecamatan, setDataKecamatan] = useState("");
  const [jalan, setJalan] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [provinsi, setProvinsi] = useState();
  const [provId, setProvId] = useState();
  const [kabs, setKabs] = useState([]);
  const [kab, setKab] = useState();
  const [kabId, setKabId] = useState();
  const [kecs, setKecs] = useState([]);
  const [kec, setKec] = useState([]);
  const [kecId, setKecId] = useState();

  // Untuk add data porter
  const handleSubmit = async () => {
    var axios = require("axios");
    var data = JSON.stringify({
      name: name,
      email: email,
      password: password,
      no_telp: no_telp,
      provinsi: provinsi,
      kota: kab,
      kecamatan: kec,
      jalan: jalan,
    });

    var config = {
      method: "post",
      url: "https://altagp3.online/porter",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        Router.push({ pathname: "/admin/porter" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Provinsi

  const handleProvinces = (item) => {
    // e.preventDefault();
    console.log(item);
    setProvinsi(item.nama);
    setProvId(item.id);
  };

  const handleKab = (item) => {
    console.log(item);
    // e.preventDefault();
    console.log("kabupaten", item);
    setKabId(item.id);
    setKab(item.nama);
    console.log(item.nama);
    // setKab(item.id);
    // setKab(item.id_provinsi);
  };

  const getProv = () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "https://dev.farizdotid.com/api/daerahindonesia/provinsi",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data.provinsi));
        setProvinces(response.data.provinsi);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getProv();
  }, []);

  /////////kabupaten

  const getKab = async () => {
    axios
      .get(
        `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provId}`
      )
      .then((response) => {
        // console.log(response.data.kota_kabupaten);
        setKabs(response.data.kota_kabupaten);
        console.log(kabs);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getKab();
  }, [provId]);

  ////////////////kecamatan
  console.log(kecId);
  const handleKec = (item) => {
    // e.preventDefault();
    setKecId(item.id);
    setKec(item.nama);
  };
  const getKec = async () => {
    axios
      .get(
        `http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${kabId}`
      )
      .then((response) => {
        console.log(response.data.kecamatan);
        setKecs(response.data.kecamatan);
      });
  };
  useEffect(() => {
    getKec();
  }, [kabId]);

  return (
    <div>
      <HeaderAdmin />
      <p>{provinsi}</p>
      <p>{kab}</p>
      <p>{kec}</p>
      <Row>
        <Col md={2}></Col>
        <Col md={8} className="p-5 bg-putih mt-5 border border-lime rounded-2">
          <Row id="atas">
            <Col>
              <Form.Group>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                <Form.Label className="mt-2">Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                <Form.Label className="mt-2">No_Telp</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNo_Telp(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row id="tengah" className="mt-5">
            <Row className=" mb-2">
              <Col>
                <Form.Label>Provinsi</Form.Label>
                <Form.Select classname="text-alpukat">
                  <option selected disabled>
                    Pilih Provinsi
                  </option>
                  {provinces.map((item, index) => {
                    return (
                      <option
                        value={item}
                        key={index}
                        onClick={() => handleProvinces(item)}
                      >
                        {item.nama}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Kabupaten / Kota</Form.Label>
                <Form.Select className="text-alpukat">
                  <option selected disabled>
                    Pilih Kab./Kota
                  </option>
                  {kabs.map((item, index) => {
                    return (
                      <option
                        value={item}
                        key={index}
                        onClick={() => handleKab(item)}
                      >
                        {item.nama}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Kecamatan</Form.Label>
                <Form.Select
                  className="text-alpukat"
                  onChange={(e) => handleKec(e)}
                >
                  <option selected disabled>
                    Pilih Kec.
                  </option>
                  {kecs.map((item, index) => {
                    return (
                      <option
                        value={item.id}
                        key={index}
                        onClick={() => handleKec(item)}
                      >
                        {item.nama}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Jalan</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                rows={3}
                onChange={(e) => setJalan(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Row>

          <Row id="bawah" className="mt-5">
            <Col>
              <Button
                variant="lime text-putihan"
                onClick={() => handleSubmit()}
              >
                Tambah
              </Button>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Index;
