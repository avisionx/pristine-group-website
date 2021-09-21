import React, { useEffect, useState } from "react";
import { Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { H2 } from "./Home";
import LinkArrow from "../img/link-arrow.svg";

const News = ({ isSmall }) => {

  const [newsData, setNewsData] = useState([]);


  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/avisionx/pristine-group-news-api/main/news.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.news);
      });
  }, []);

  return (
    <>
      <div className="container-fluid my-5">
        <H2 className="text-gradient text-center d-block d-lg-none text-lg-right text-uppercase font-weight-bold">
        <span>Top News</span>
          <div >
            <hr
              style={{
                margin: "0",
                width: isSmall ? "50%" : "5rem",
                float: "right",
                background: "#cc040c",
              }}
            />
            <hr
              style={{
                margin: "0",
                width: isSmall ? "50%" : "5rem",
                float: "right",
                background: "#049cf4",
              }}
            />
          </div>
        </H2>
        <div className="row d-flex justify-content-center">
          <div className="d-none d-lg-block col-sm-12 col-lg-auto">
            <h5
              className="text-gradient  text-nowrap font-weight-bold mb-3 display-1"
              style={{
                position: "absolute",
                transform: "rotate(-90deg)",
                right: "3rem",
                top: "-6rem",
                transformOrigin: "bottom right",
                opacity: 0.8
              }}
            >
              Latest News
            </h5>
          </div>
          <div className="order-3 order-lg-2 col-sm-12 col-lg-9">
            <div className="row mt-5 mt-lg-0" style={{minHeight: "60vh"}}>
              {newsData.length <= 0 && <div className="mt-5 pt-5 text-center w-100">Fetching Latest News...</div>}
          {newsData.map((data) => (
                <div
                  className="col-12 col-lg-4 mb-4 mb-lg-5 text-no-decor"
                  key={data.title}
                >
                  <Card className="rounded-0 shadow h-100">
                    <CardImg
                      top
                      className="rounded-0"
                      width="100%"
                      src={data.img}
                      alt=""
                    />
                    <CardBody className="d-flex flex-column">
                      <CardTitle className="text-dark widen" tag="h5">
                        {data.title.replace(/^(.{70}[^\s]*).*/, "$1")}
                      </CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <Badge color="primary" pill>
                          {data.tag}
                        </Badge>
                      </CardSubtitle>
                      <CardText className="text-dark small">
                        {data.para.substring(0, 140)}...
                      </CardText>
                      <a
                        className="text-gradient text-right small mt-auto"
                        href={data.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Continue Reading
                        <img
                          className="ml-3"
                          width="20px"
                          src={LinkArrow}
                          alt=""
                        />
                      </a>
                    </CardBody>
                  </Card>
                </div>
              ))}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
