import React from "react";

export default function Footer (props) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%", backgroundColor: "#000D20" }}>
        <div style={{ width: "1200px", margin: "0 auto", paddingTop: 40, paddingBottom: 40, display: "flex" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#FFF", fontWeight: "bold", fontSize: 12, marginBottom: 6 }}>General Inquiries</div>
            <div style={{ color: "#FFF", textDecorationLine: "underline", fontSize: 12, marginBottom: 10 }}>contact@orai.io</div>
            <div style={{ color: "#FFF", fontWeight: "bold", fontSize: 12, marginBottom: 6 }}>Technical support</div>
            <div style={{ color: "#FFF", textDecorationLine: "underline", fontSize: 12 }}>support@orai.io</div>
          </div>
          <div style={{ flex: 2 }}>
            <div style={{ color: "#FFF", fontSize: 12 }}>We can be mailed at:</div>
            <div style={{ color: "#FFF", fontSize: 12 }}>Oraichain Pte. Ltd.</div>
            <div style={{ color: "#FFF", fontSize: 12 }}>68 Circular Road, #02-01, , 049422,Singapore</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: "#FFF", marginBottom: 10, fontWeight: "bold" }}>About</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>Introduction</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>Orai Task</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>FAQ</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", fontWeight: "bold" }}>Media Park</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: "#FFF", marginBottom: 10, fontWeight: "bold" }}>Product</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>LME</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>Testnet</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>yAI.Finance</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", fontWeight: "bold" }}>Marketplace</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: "#FFF", marginBottom: 10, fontWeight: "bold" }}>Official Channels</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>Twitter</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>Telegram</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", marginBottom: 6, fontWeight: "bold" }}>Coingecko</div>
            <div style={{ fontSize: 12, color: "#9CBBEC", fontWeight: "bold" }}>Medium</div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", backgroundColor: "#495A75" }}>
        <div style={{ width: "1200px", margin: "0 auto", paddingTop: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#99AAC2", fontSize: 12 }}>©2020 Oraichain Pte. Ltd. All rights reserved. Privacy Policy Customer Support</div>
          <div style={{ display: "flex" }}>
            <div style={{ color: "#99AAC2", fontSize: 12, marginRight: 30 }}>Privacy Policy</div>
            <div style={{ color: "#99AAC2", fontSize: 12, marginRight: 30 }}>Customer Support</div>
            <div style={{ color: "#99AAC2", fontSize: 12 }}>Careers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
