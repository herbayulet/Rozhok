import React from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Footer from "../../../components/Footer";
import { Button, Col, Row, Table } from "react-bootstrap";

const Index = () => {
  const hargaClient = 666666;
  const hargaMitra = 7777777;

  const goTambah = (e) => {
    location.href = "/admin/porter/tambah";
  };

  const formatClient = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "symbol",
  }).format(hargaClient);

  const formatMitra = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "symbol",
  }).format(hargaMitra);

  return (
    <div>
      <HeaderAdmin />
      <Row className="m-0 mb-5">
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant="lime mt-5 border-alpukat" onClick={() => goTambah()}>
            Tambah Porter
          </Button>
        </Col>
      </Row>
      <Row className="m-0 mt-5">
        <Col></Col>
        <Col md={8} className="text-center">
          <Table>
            <thead className="bg-alpukat text-putihan">
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>No. Telpon</th>
                <th>Email</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="border-tea border">
              <tr>
                <td>1</td>
                <td>Usopp</td>
                <td>0951372864</td>
                <td>usopp@strawhat.com</td>
                <td>
                  <a
                    href="/admin/porter/tambah"
                    className="text-alpukat text-decoration-none"
                  >
                    Edit
                  </a>
                  {" | "}
                  <a
                    href="/admin/porter/detail"
                    className="text-alpukat text-decoration-none"
                  >
                    Detail
                  </a>
                  {" | "}
                  <a href="" className="text-alpukat text-decoration-none">
                    Hapus
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col></Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Index;
