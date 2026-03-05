import { useEffect, useRef } from "react";
import gsap from "gsap";
import CoreTeamCard from "../components/CoreTeamCard";

const webTeam = [
  {
    name: "Shiftain Ahmad",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/nswqzDxt/shiftain.jpg",
    socials: [
      { 
        label: "@shiftain_04", 
        url: "https://www.instagram.com/shiftain_04/", 
        color: "#E4405F" 
      }
    ],
  },
  {
    name: "Aayush Arya",
    role: "Co-Head",
    batch: "2024",
    photo: "/aayush.png",
    socials: [
      {
        label: "@aayusharya_i_am",
        url: "https://www.instagram.com/aayusharya_i_am",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Krish Agarwal",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/Z6Kntp6M/IMG-20251025-WA0010-Krish-Agarwal.jpg",
    socials: [
      {
        label: "@coffee.to.code.machine",
        url: "https://www.instagram.com/coffee.to.code.machine",
        color: "#E4405F",
      },
    ],
  },
];

const technicalTeam = [
  {
    name: "Gaurav Kumar Singh",
    role: "Head",
    batch: "2023",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [{ label: "@", url: "#", color: "#E4405F" }],
  },
  {
    name: "Spandan Roy",
    role: "Head",
    batch: "2023",
    photo: "https://i.ibb.co/GQn2fWsW/1758950358096-Spandan-Roy.png",
    socials: [
      {
        label: "@spandan.roy64",
        url: "http://instagram.com/spandan.roy64",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Shivam Singh",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/chYC6TyM/1000114980-1672-1604-Shivam-Singh.jpg",
    socials: [
      {
        label: "@maverickkk18_",
        url: "https://www.instagram.com/shiv_am_183?igsh=NnJ3emV2NnBzMnk5",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Aayush Babu",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/Kc08z7Yj/IMG-20250916-WA0018-Aayush-Babu.jpg",
    socials: [
      {
        label: "@freshlycuttomato",
        url: "http://www.instagram.com/freshlycuttomato",
        color: "#E4405F",
      },
    ],
  },
];

const logisticsTeam = [
  {
    name: "Priyambad Kr Dubey",
    role: "Head",
    batch: "2023",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Adarsh Raj",
    role: "Head",
    batch: "2023",
    photo: "https://i.ibb.co/k6G8vjSw/IMG-20260118-WA0048-ADARSH-RAJ.jpg",
    socials: [
      {
        label: "@raj_adarsh18",
        url: "https://www.instagram.com/raj_adarsh18",
        color: "#E4405F",
      },
    ],
  },

  {
    name: "Shubhankar Kumar Jha",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/w9JF5Zx/IMG-20260116-WA0001-Shubhankar-Jha.jpg",
    socials: [
      {
        label: "@shubhankar_jha_18",
        url: "https://www.instagram.com/shubhankar_jha_18?igsh=cDhmcWFyZ2s3cjlt",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Saurabh Suman",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },

];

const eventTeam = [
  {
    name: "Anurag Anand",
    role: "Head",
    batch: "2023",
    photo: "/Anurag.jpeg",
    socials: [
      {
        label: "@anurag_anand10",
        url: "https://www.instagram.com/anurag_anand10",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Aditya Raj Chandel",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/h1Rr1tFS/chandel.jpg",
    socials: [
      {
        label: "@chaotic_adi_",
        url: "https://www.instagram.com/chaotic_adi_?igsh=MTFpdHZqaDhkczdwOQ==",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Aman Kumar",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [
      {
        label: "@amanx_.exe",
        url: "https://www.instagram.com/amanx_.exe?igsh=aXI0OTE3NGc0NG1s",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Gargi Kumari",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/Df8PhT5p/IMG-20250208-WA0007-Shruti-Kumari.jpg",
    socials: [
      {
        label: "@gargi_913",
        url: "https://www.instagram.com/gargi_913?igsh=YWZ6bnNmNXZ0azM0",
        color: "#E4405F",
      },
    ],
  },
];

const publicityTeam = [
  {
    name: "Udit Ojha",
    role: "Head",
    batch: "2023",
    photo: "/Udit.jpeg",
    socials: [
      {
        label: "@__udit.ojha__",
        url: "https://www.instagram.com/__udit.ojha__",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Avi Singh",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/v6wgCQV8/IMG-20251109-WA0016-Avi-Singh.jpg",
    socials: [
      {
        label: "@avi.singh6451",
        url: "https://www.instagram.com/avi.singh6451?utm_source=qr&igsh=dXNkd2d5bzZ6cnRu",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Anshu Priya",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://i.ibb.co/5WQFRD1L/97e0f9e1-bd7b-484e-ab91-dff915daa857-Anshu-Priya.jpg",
    socials: [
      {
        label: "@_.official.honey",
        url: "https://www.instagram.com/_.official.honey?igsh=MW96ajE5amp3dGo2Ng==",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Kaushiki",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/prww7FGg/Kaushiki.jpg",
    socials: [
      {
        label: "@thats_kaushiki",
        url: "https://www.instagram.com/thats_kaushiki?igsh=MXVlMDgzcGoxb2k2Ng%3D%3D&utm_source=qr",
        color: "#E4405F",
      },
    ],
  },
];

const sponsorshipTeam = [
  {
    name: "Pratik Raj",
    role: "Head",
    batch: "2023",
    photo: "https://i.ibb.co/39m5fsrS/IMG-20260124-133027-271-Pratik-Raj.webp",
    socials: [
      {
        label: "@_itzz_pratikk",
        url: "https://www.instagram.com/_itzz_pratikk?igsh=MXI5a2QyYnMzZHAwaA==",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Tanmay Sinha",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/zWHmvPSM/tamnay.jpg",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Parv Ninama",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/GQTqLQ0r/IMG-20260222-223518-Parv-Ninama.png",
    socials: [
      {
        label: "@p.arv_v",
        url: "https://www.instagram.com/p.arv_v",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Aditya Narayan",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/NgF5VCMM/Snapchat-236085978-Aditya-Narayan.jpg",
    socials: [
      {
        label: "@aditya_singh945",
        url: "https://www.instagram.com/aditya_singh945?igsh=cjc5ZzlpemR0OHph",
        color: "#E4405F",
      },
    ],
  },
];

const hospitalityTeam = [
  {
    name: "Piyush Priyadarshi",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/VYXZtNhp/Piyush-Priyadarshi.jpg",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Vivek Kumar Modi",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/rWdxk6T/IMG-20260130-23055212-1-Vivek-Kumar-Modi.jpg",
    socials: [
      {
        label: "@vivek_kr_modi._",
        url: "https://www.instagram.com/vivek_kr_modi._",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Shruti",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/Jjm0Znrh/shurti.jpg",
    socials: [
      {
        label: "@parasar_shruti",
        url: "https://www.instagram.com/parasar_shruti",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Aaryan Tiwari",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/1tJ20xPy/IMG-20260222-WA0012-Aryan-Tiwari.jpg",
    socials: [
      {
        label: "@devilish906",
        url: "https://www.instagram.com/devilish906",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Astha Kiran",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/84Q6kc3M/My-Image-1769102179-05-Astha-Kiran.jpg",
    socials: [
      {
        label: "@_itsastha._",
        url: "https://www.instagram.com/_itsastha._?igsh=MXFnOWxpbGlwamljMg==",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Anshu Singh",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://i.ibb.co/JR1h197z/anshu-singh.jpg",
    socials: [
      {
        label: "@anshu_s1ngh",
        url: "https://www.instagram.com/anshu_s1ngh?igsh=bHJ6MnUwZzdtMWo3",
        color: "#E4405F",
      },
    ],
  },
];

const designDecorTeam = [
  {
    name: "Niharika Soni",
    role: "Head",
    batch: "2023",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Priyanka Agarwal",
    role: "Head",
    batch: "2023",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Rama Pandey",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/3557nHJ0/IMG-20260123-WA0037-Rama-Pandey.jpg",
    socials: [
      {
        label: "@rama__pandey06",
        url: "https://www.instagram.com/rama__pandey06?igsh=MWpnMHJjOG9zeWFhOQ==",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Priti Kumari",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://i.ibb.co/6JrMGLpH/Priti-singh.jpg",
    socials: [
      {
        label: "@berry_blusie11",
        url: "https://www.instagram.com/berry_blusie11",
        color: "#E4405F",
      },
    ],
  },
];

const designAndDraftingTeam = [
  {
    name: "Shivani",
    role: "Head",
    batch: "2023",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Ashutosh Sharma",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://i.ibb.co/1f0hsjP4/ashutosh-sharma.jpg",
    socials: [
      {
        label: "@sharmashutosh01",
        url: "https://www.instagram.com/sharmashutosh01",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Kanan Kotwani",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://i.ibb.co/Fq0yM0vj/kanan.jpg",
    socials: [
      {
        label: "@kaananfr",
        url: "https://www.instagram.com/kaananfr?igsh=MTR4YTE4amxjeHhoMQ%3D%3D&utm_source=qr",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Aditi Shrivastava",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
];

const pressMediaTeam = [
  {
    name: "Anubhav Singh",
    role: "Head",
    batch: "2023",
    photo: "https://i.ibb.co/nsyBRpHw/IMG-20260125-WA0060-Anubhav-Kumar.jpg",
    socials: [
      {
        label: "@anu3havv",
        url: "https://www.instagram.com/anu3havv",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Om Raj",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/hnSWzp3/IMG-20251130-123252-383-omraj-thakur.webp",
    socials: [
      {
        label: "@om_raj007",
        url: "https://www.instagram.com/om_raj007",
        color: "#E4405F",
      },
    ],
  },
];

const convener = [
  {
    name: "Rohit Kumar",
    role: "Head",
    batch: "2023",
    photo: "/Rohit.jpeg",
    socials: [
      {
        label: "@heyy_r.g",
        url: "https://www.instagram.com/heyy_r.g",
        color: "#E4405F",
      },
    ],
  },
];

const coConvener = [
  {
    name: "Aditya Raj",
    role: "Co-Convener",
    batch: "2023",
    photo:
      "https://i.ibb.co/1YfzY1mY/aditya-raj.jpg",
    socials: [
      {
        label: "@aditya22_raj",
        url: "https://instagram.com/aditya22_raj",
        color: "#E4405F",
      },
    ],
  },
];

const sportsSecretary = [
  {
    name: "Suyash Ranjan Sinha",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/Lzr0n9Tx/suyash-sinha.jpg",
    socials: [
      {
        label: "@suyash_1876",
        url: "https://www.instagram.com/suyash_1876",
        color: "#E4405F",
      },
    ],
  },
];

const treasuryTeam = [
  {
    name: "Rohit Yadav",
    role: "Head",
    batch: "2023",
    photo: "https://i.ibb.co/RrZ79PR/IMG-20260220-183622-261-Rohit-yadav.webp",
    socials: [
      {
        label: "@rohit_rao.079",
        url: "https://www.instagram.com/rohit_rao.079?igsh=ajB0djB0aXV4dG8y",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Parbhakar Kumar",
    role: "Head",
    batch: "2023",
    photo: "https://i.ibb.co/bRz2s9S9/IMG-20260222-225808-Parbhakar-Mehta.jpg",
    socials: [
      {
        label: "@prbhkr_00",
        url: "https://www.instagram.com/prbhkr_00?igsh=azBrM3Vhcjc3eGt6",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Nipun Sinha",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/bj1pth0N/IMG-4191-Nipun-Sinha.jpg",
    socials: [
      {
        label: "@Uff_nipun",
        url: "https://www.instagram.com/uffx_nipun?igsh=eWV4Mmk5eXd5YWgy",
        color: "#E4405F",
      },
    ],
  },
];

const disciplineTeam = [
  {
    name: "Ashutosh Kumar",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/gZ9fVQnQ/gensec.jpg",
    socials: [
      {
        label: "@ohnoitsahu",
        url: "https://www.instagram.com/ohnoitsahu",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Shreedhar Narayan",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/7J65L3TP/874b183a-b945-4abf-883e-25a5b8163ea5-MR-SHREEDHAR.jpg",
    socials: [
      {
        label: "@_mr_shreedhar_",
        url: "https://www.instagram.com/_mr_shreedhar_?igsh=NXA1dHNvbGs2b3ln",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Chalvi Raj",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/1G96vkTf/a2b0d895-b522-4eb6-a13b-e528f953598d-Chalvi-Raj.jpg",
    socials: [
      {
        label: "@chalvi__raj",
        url: "https://www.instagram.com/chalvi__raj?igsh=MW44MmJxYm40czQxZg%3D%3D&utm_source=qr",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Shristi Kumari",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/XrF0vfHv/shristi-kumari.jpg",
    socials: [
      {
        label: "@shristi.011",
        url: "https://www.instagram.com/shristi.011?igsh=N3EwanJ4MGs0YWY0",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Shristi Raj",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/Mk5CpBqg/IMG-20260222-230554-Shristi-Raj.jpg",
    socials: [
      {
        label: "@shristiraj_31",
        url: "https://www.instagram.com/shristiraj_31?igsh=b3U0Zzk2bWdjcXo2",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Sahil Raj",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/wNFYr8sn/sahil-raj.jpg",
    socials: [
      {
        label: "@sahil.bhardwazz",
        url: "",
        color: "#E4405F",
      },
    ],
  },
];

const venueManagementTeam = [
  {
    name: "Ritik Raushan",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/ym4m1P0M/Screenshot-2026-01-26-11-16-53-25-99c04817c0de5652397fc8b56c3b3817-Ritik-Raushan.jpg",
    socials: [
      {
        label: "@ritikraushan3707",
        url: "https://www.instagram.com/ritikraushan3707",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Hardik Kumar Singh",
    role: "Head",
    batch: "2023",
    photo:
      "https://i.ibb.co/j9c2P9QT/IMG-20250630-WA0041-Hardik-Singh.jpg",
    socials: [
      {
        label: "@",
        url: "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Sanjam Raj",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/VpqVVjbf/IMG-20260223-WA0002-Sanjam-Raj.jpg",
    socials: [
      {
        label: "@snjmrj06",
        url: "https://www.instagram.com/snjmrj06?igsh=MjFodGlna2k5bWhp",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Pradumn Yadav",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/67XnQSzF/Pradumn-Yadav.jpg",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
];

const foodCateringTeam = [
  {
    name: "Aniket Raj",
    role: "Head",
    batch: "2023",
    photo:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Nitin Choudhary",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/qLs9CyRR/IMG-20260123-WA0057-nitin.jpg",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Vishwajeet kumar ",
    role: "Co-Head",
    batch: "2024",
    photo: "https://i.ibb.co/XrXmf3xg/Vishwajeet-kumar.jpg",
    socials: [
      {
        label: "@vishwajeet_singh_2004",
        url: "https://www.instagram.com/vishwajeet_singh_2004",
        color: "#E4405F",
      },
    ],
  },
];

const outreachAlumniTeam = [
  {
    name: "Prachi Singh",
    role: "Head",
    batch: "2023",
    photo: "https://i.ibb.co/JF51F52Q/Photo-prachi-singh.jpg",
    socials: [
      {
        label: "@fr__prachiiiii",
        url: "https://www.instagram.com/fr__prachiiiii?igsh=a2VjN3c2dGV2N3ps",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Aditi Maharor",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://i.ibb.co/C5ZvZPhC/Screenshot-2026-02-22-23-11-05-37-99c04817c0de5652397fc8b56c3b3817-Aditi-M.jpg",
    socials: [
      {
        label: "@",
        url: "",
        color: "#E4405F",
      },
    ],
  },
  {
    name: "Maadhavi",
    role: "Co-Head",
    batch: "2024",
    photo:
      "https://i.ibb.co/5WM5fTVY/maadhavi.jpg",
    socials: [
      {
        label: "@madvi_12",
        url: "https://www.instagram.com/madvi_12_?utm_source=qr&igsh=MXVkMnM2c3ZzNGtmYg==",
        color: "#E4405F",
      },
    ],
  },
];

const Core = () => {
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.3 },
        "-=0.5",
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        "-=0.4",
      );
  }, []);

  return (
    <main className="min-h-screen bg-page-gradient">
      <div className="core-moving-bg" />

      <section className="relative z-10 px-6 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1
            ref={headingRef}
            className="font-display text-5xl md:text-7xl font-bold tracking-wide mb-6 opacity-0"
          >
            Meet Our{" "}
            <span className="bg-[linear-gradient(135deg,#F48C06,#FF4100)] bg-clip-text text-transparent">
              Core Team
            </span>
          </h1>

          <div
            ref={lineRef}
            className="glow-line h-px w-48 mx-auto mb-2 origin-center"
            style={{ transform: "scaleX(0)" }}
          />

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0"
          >
            The brilliant minds shaping our vision and driving innovation
            forward every single day.
          </p>
        </div>

        <div className="grid grid-cols-1  gap-4 md:gap-6 mx-auto sm:px-[clamp(200px,37%,450px)] mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Convener
          </p>
          {convener.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1  gap-4 md:gap-6 mx-auto sm:px-[clamp(200px,37%,450px)] mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Co-Convener
          </p>
          {coConvener.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1  gap-4 md:gap-6 mx-auto sm:px-[clamp(200px,37%,450px)] mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Sports Secretary
          </p>
          {sportsSecretary.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:px-[117px] gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Web Dev
          </p>
          {webTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Technical Team
          </p>
          {technicalTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Logistics Team
          </p>
          {logisticsTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Event Management Team
          </p>
          {eventTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Publicity & Social Media Team
          </p>
          {publicityTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Sponsorship Team
          </p>
          {sponsorshipTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Hospitality Team
          </p>
          {hospitalityTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Design & Decor Team
          </p>
          {designDecorTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Design & Drafting Team
          </p>
          {designAndDraftingTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:px-[117px] gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Treasury Team
          </p>
          {treasuryTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:px-[117px] mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Food & Catering Team
          </p>
          {foodCateringTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Venue Management Team
          </p>
          {venueManagementTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Discipline Team
          </p>
          {disciplineTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 md:px-[70px] lg:px-[270px] gap-4 md:gap-6 mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Press & Media Team
          </p>
          {pressMediaTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:px-[117px] mx-auto mb-10">
          <p className="col-span-full font-display text-center text-5xl font-bold tracking-wide bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-yellow-500">
            Outreach & Alumni Affair Team
          </p>
          {outreachAlumniTeam.map((member, i) => (
            <CoreTeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Core;
