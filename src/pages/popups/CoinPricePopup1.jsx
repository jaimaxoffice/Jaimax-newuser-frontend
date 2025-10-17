

import React, { useState, useEffect } from 'react';
import icon from "../../assets/Images/jaimaxcoin.png";

const CoinPricePopup = ({
  coinName = "JaiMax Coin",
  coinSymbol = "JMC",
  oldPriceINR = "0.028",
  newPriceINR = "0.03",
  oldPriceUSD = "0.00032",
  newPriceUSD = "0.00034",
  startDate = "2025-09-30T00:00:00",
  endDate = "2025-10-03T00:00:00",
  onBuy = () => {},
  onClose = () => {},
  forceVisible = false,
  theme = "style1" // style1 through style6
}) => {
  const [isVisible, setIsVisible] = useState(forceVisible);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(100);
  
  // Calculate price change percentage
  const oldPrice = parseFloat(oldPriceINR);
  const newPrice = parseFloat(newPriceINR);
  const percentChange = ((newPrice - oldPrice) / oldPrice) * 100;
  const isPositive = percentChange >= 0;
  
  // Date formatting
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  
  // Set up circular progress bar variables
  const radius = 22;
  const strokeWidth = 4;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Set up the timer
  useEffect(() => {
    if (!isVisible) return;
    
    const endTime = new Date(endDate).getTime();
    const startTime = new Date(startDate).getTime();
    const totalDuration = endTime - startTime;
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = endTime - now;
      
      // Calculate progress as percentage of time remaining
      const progressValue = Math.max(0, Math.min(100, (timeRemaining / totalDuration) * 100));
      setProgress(progressValue);
      
      if (timeRemaining > 0) {
        setTimeLeft({
          days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeRemaining / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeRemaining / 1000 / 60) % 60),
          seconds: Math.floor((timeRemaining / 1000) % 60)
        });
      } else {
        clearInterval(timer);
        setIsVisible(false);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isVisible, startDate, endDate]);
  
  // Handle popup closing
  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };
  
  // Handle buy button click
  const handleBuy = () => {
    onBuy();
    handleClose();
  };
  
  if (!isVisible) return null;
  
  // Get the appropriate colors based on theme
  let colors = {};
  
  if (theme === "style1" || theme === "style2" || theme === "style3" || theme === "style4") {
    // Green theme variations
    colors = {
      primary: "#18a04a",
      secondary: "#0d3e23",
      dark: "#0a2e19",
      light: "#a7f3d0",
      lightest: "#d1fae5",
      accent: "#2edb70",
      gradient: `linear-gradient(135deg, #18a04a, #106b32)`
    };
  } else {
    // Teal theme variations (style5, style6)
    colors = {
      primary: "#0d9488",
      secondary: "#115e59",
      dark: "#042f2e",
      light: "#99f6e4",
      lightest: "#ccfbf1",
      accent: "#2dd4bf",
      gradient: `linear-gradient(135deg, #0d9488, #115e59)`
    };
  }
  
  // Timer display component with leading zeros
  const TimerDisplay = ({value, label, style}) => {
    const formattedValue = value < 10 ? `0${value}` : value;
    
    return (
      <div style={style.container}>
        <div style={style.value}>{formattedValue}</div>
        <div style={style.label}>{label}</div>
      </div>
    );
  };
  
  // Circular progress with icon
  const CircularProgress = ({size = 60, color, bgColor, iconSize = 30, strokeW = 4}) => {
    return (
      <div style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg
          height={size}
          width={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{transform: "rotate(-90deg)"}}
        >
          <circle
            cx={size/2}
            cy={size/2}
            r={normalizedRadius}
            fill="transparent"
            stroke={bgColor || "rgba(255,255,255,0.2)"}
            strokeWidth={strokeW}
          />
          <circle
            cx={size/2}
            cy={size/2}
            r={normalizedRadius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeW}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{transition: "stroke-dashoffset 0.5s"}}
          />
        </svg>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          <img 
            src={icon} 
            alt={coinSymbol}
            style={{
              width: iconSize,
              height: iconSize,
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    );
  };

  // Style 1: Modern Clean
  if (theme === "style1") {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}>
        <div style={{
          width: "330px",
          maxWidth: "100%",
          background: colors.dark,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.3s ease-out",
        }}>
          {/* Header */}
          <div style={{
            background: colors.gradient,
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <h2 style={{
                margin: 0,
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
              }}>{coinName}</h2>
              <div style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
              }}>{coinSymbol}</div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "30px",
              padding: "6px 12px",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
            }}>
              {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
            </div>
          </div>
          
          {/* Content */}
          <div style={{padding: "20px"}}>
            <div style={{
              fontSize: "16px",
              color: "white",
              textAlign: "center",
              marginBottom: "16px",
              fontWeight: "500",
            }}>
              Price Update!
            </div>
            
            {/* Price comparison */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(255,255,255,0.05)",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}>
              <div style={{textAlign: "center"}}>
                <div style={{color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "4px"}}>Previous</div>
                <div style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "16px",
                  textDecoration: "line-through",
                }}>{oldPriceINR} ₹</div>
                <div style={{color: "rgba(255,255,255,0.6)", fontSize: "12px"}}>${oldPriceUSD}</div>
              </div>
              
              <div style={{
                color: colors.accent,
                fontSize: "24px",
              }}>→</div>
              
              <div style={{textAlign: "center"}}>
                <div style={{color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "4px"}}>Current</div>
                <div style={{
                  color: colors.accent,
                  fontSize: "18px",
                  fontWeight: "bold",
                }}>{newPriceINR} ₹</div>
                <div style={{color: "rgba(255,255,255,0.6)", fontSize: "12px"}}>${newPriceUSD}</div>
              </div>
            </div>
            
            {/* Message */}
            <p style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              textAlign: "center",
              margin: "0 0 20px 0",
              lineHeight: "1.5",
            }}>
              Don't miss the chance — the earlier you buy, the bigger your future rewards!
            </p>
            
            {/* Timer and progress */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}>
              <CircularProgress
                color={colors.accent}
                bgColor="rgba(255,255,255,0.1)"
              />
              
              <div style={{
                display: "flex",
                gap: "8px",
                marginLeft: "15px",
                flex: 1,
              }}>
                {[
                  {value: timeLeft.days, label: "Days"},
                  {value: timeLeft.hours, label: "Hours"},
                  {value: timeLeft.minutes, label: "Mins"},
                  {value: timeLeft.seconds, label: "Secs"},
                ].map((item, index) => (
                  <TimerDisplay 
                    key={index} 
                    value={item.value} 
                    label={item.label} 
                    style={{
                      container: {
                        background: "rgba(255,255,255,0.05)",
                        padding: "8px 4px",
                        borderRadius: "8px",
                        textAlign: "center",
                        flex: 1,
                      },
                      value: {
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                      },
                      label: {
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "10px",
                        marginTop: "2px",
                      },
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Valid period */}
            <div style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "16px",
              textAlign: "center",
            }}>
              Valid: {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            
            {/* Action button */}
            <div style={{
              display: "flex",
              gap: "12px",
            }}>
              <button style={{
                flex: 1,
                padding: "12px 0",
                background: colors.primary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
              }} onClick={handleBuy}>
                Buy Now
              </button>
            </div>
          </div>
          
          {/* Close button */}
          <button style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
          }} onClick={handleClose}>
            ×
          </button>
        </div>
      </div>
    );
  }
  
  // Style 2: Neon Green
  else if (theme === "style2") {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}>
        <div style={{
          width: "340px",
          maxWidth: "100%",
          background: "#071507",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
          border: `1px solid ${colors.accent}`,
          boxShadow: `0 0 20px rgba(46, 219, 112, 0.3)`,
          animation: "fadeIn 0.3s ease-out",
        }}>
          {/* Glow effect */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            boxShadow: `inset 0 0 15px rgba(46, 219, 112, 0.3)`,
            borderRadius: "10px",
            pointerEvents: "none",
          }}></div>
          
          <div style={{padding: "20px"}}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <CircularProgress
                  size={50}
                  color={colors.accent}
                  bgColor="rgba(46, 219, 112, 0.15)"
                  iconSize={24}
                />
                <div>
                  <h2 style={{
                    margin: 0,
                    color: colors.accent,
                    fontSize: "18px",
                    fontWeight: "bold",
                    textShadow: `0 0 8px rgba(46, 219, 112, 0.5)`,
                  }}>{coinName}</h2>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "14px",
                  }}>{coinSymbol}</div>
                </div>
              </div>
              
              <div style={{
                background: isPositive ? "rgba(46, 219, 112, 0.1)" : "rgba(255, 67, 67, 0.1)",
                padding: "6px 12px",
                borderRadius: "4px",
                color: isPositive ? colors.accent : "#ff4343",
                fontWeight: "bold",
                fontSize: "15px",
                textShadow: isPositive ? `0 0 8px rgba(46, 219, 112, 0.5)` : `0 0 8px rgba(255, 67, 67, 0.5)`,
                border: `1px solid ${isPositive ? "rgba(46, 219, 112, 0.3)" : "rgba(255, 67, 67, 0.3)"}`,
              }}>
                {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
              </div>
            </div>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              marginBottom: "20px",
            }}>
              {[
                {value: timeLeft.days, label: "D"},
                {value: timeLeft.hours, label: "H"},
                {value: timeLeft.minutes, label: "M"},
                {value: timeLeft.seconds, label: "S"},
              ].map((item, index) => (
                <div key={index} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(46, 219, 112, 0.2)`,
                  padding: "8px 4px",
                  borderRadius: "6px",
                  minWidth: "40px",
                  textAlign: "center",
                  position: "relative",
                }}>
                  <div style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}>{item.value < 10 ? `0${item.value}` : item.value}</div>
                  <div style={{
                    color: colors.accent,
                    fontSize: "10px",
                    marginTop: "2px",
                    textShadow: `0 0 5px rgba(46, 219, 112, 0.5)`,
                  }}>{item.label}</div>
                  
                  {/* Glow only on seconds counter */}
                  {index === 3 && timeLeft.seconds % 2 === 0 && (
                    <div style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, bottom: 0,
                      boxShadow: `0 0 10px ${colors.accent}`,
                      borderRadius: "6px",
                      animation: "pulse 1s infinite",
                      pointerEvents: "none",
                    }}></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Neon line */}
            <div style={{
              height: "1px",
              background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)`,
              margin: "0 -20px 20px -20px",
              boxShadow: `0 0 8px ${colors.accent}`,
            }}></div>
            
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              marginBottom: "20px",
            }}>
              <div style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                padding: "15px",
                border: `1px solid rgba(46, 219, 112, 0.15)`,
                textAlign: "center",
              }}>
                <div style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                  marginBottom: "5px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>Old Price</div>
                <div style={{
                  color: "white",
                  fontSize: "16px",
                  marginBottom: "4px",
                  textDecoration: "line-through",
                }}>{oldPriceINR} ₹</div>
                <div style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "12px",
                }}>${oldPriceUSD}</div>
              </div>
              
              <div style={{
                flex: 1,
                background: "rgba(46, 219, 112, 0.05)",
                borderRadius: "8px",
                padding: "15px",
                border: `1px solid rgba(46, 219, 112, 0.3)`,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Animated scanner effect */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  width: "10px",
                  background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)`,
                  animation: "scanner 2s infinite linear",
                  boxShadow: `0 0 10px ${colors.accent}`,
                  left: "-10px",
                }}></div>
                
                <div style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                  marginBottom: "5px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>New Price</div>
                <div style={{
                  color: colors.accent,
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  textShadow: `0 0 8px rgba(46, 219, 112, 0.5)`,
                }}>{newPriceINR} ₹</div>
                <div style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "12px",
                }}>${newPriceUSD}</div>
              </div>
            </div>
            
            {/* Valid period */}
            <div style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "20px",
              textAlign: "center",
              fontFamily: "monospace",
              letterSpacing: "1px",
            }}>
              VALID: {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            
            {/* Action button */}
            <button style={{
              width: "100%",
              padding: "12px 0",
              background: "transparent",
              color: colors.accent,
              border: `1px solid ${colors.accent}`,
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
              textShadow: `0 0 8px rgba(46, 219, 112, 0.5)`,
              boxShadow: `0 0 10px rgba(46, 219, 112, 0.3)`,
              position: "relative",
              overflow: "hidden",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }} onClick={handleBuy}>
              Buy Now
            </button>
          </div>
          
          {/* Close button */}
          <button style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "transparent",
            border: "none",
            color: colors.accent,
            fontSize: "20px",
            cursor: "pointer",
            textShadow: `0 0 8px rgba(46, 219, 112, 0.5)`,
            zIndex: 10,
          }} onClick={handleClose}>
            ×
          </button>
        </div>
        
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          @keyframes scanner {
            0% { left: -10px; }
            100% { left: 100%; }
          }
        `}</style>
      </div>
    );
  }
  
  // Style 3: Gradient Minimal
  else if (theme === "style3") {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}>
        <div style={{
          width: "320px",
          maxWidth: "100%",
          background: colors.gradient,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
          animation: "scaleIn 0.4s ease-out",
        }}>
          <div style={{padding: "24px"}}>
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
            }}>
              <CircularProgress
                size={60}
                color="#ffffff"
                bgColor="rgba(255,255,255,0.15)"
                strokeW={3}
              />
              
              <div style={{flex: 1}}>
                <h2 style={{
                  margin: "0 0 4px 0",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}>{coinName} ({coinSymbol})</h2>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <div style={{
                    background: isPositive ? "rgba(255,255,255,0.2)" : "rgba(255,107,107,0.2)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}>
                    {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
                  </div>
                  
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "13px",
                  }}>
                    Price Update
                  </div>
                </div>
              </div>
            </div>
            
            {/* Prices */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <div>
                <div style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                  marginBottom: "8px",
                }}>Previous</div>
                <div style={{
                  color: "white",
                  fontSize: "18px",
                  marginBottom: "4px",
                  textDecoration: "line-through",
                  opacity: 0.7,
                }}>{oldPriceINR} ₹</div>
                <div style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                }}>${oldPriceUSD}</div>
              </div>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                color: "white",
                padding: "0 12px",
              }}>→</div>
              
              <div>
                <div style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                  marginBottom: "8px",
                }}>Current</div>
                <div style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}>{newPriceINR} ₹</div>
                <div style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                }}>${newPriceUSD}</div>
              </div>
            </div>
            
            {/* Timer */}
            <div style={{
              display: "flex",
              gap: "8px",
              marginBottom: "20px",
            }}>
              {[
                {value: timeLeft.days, label: "DAYS"},
                {value: timeLeft.hours, label: "HOURS"},
                {value: timeLeft.minutes, label: "MINUTES"},
                {value: timeLeft.seconds, label: "SECONDS"},
              ].map((item, index) => (
                <div key={index} style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 5px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {index === 3 && (
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(255,255,255,0.05)",
                      transform: `scaleY(${1 - timeLeft.seconds / 60})`,
                      transformOrigin: "bottom",
                      transition: "transform 1s linear",
                    }}></div>
                  )}
                  
                  <div style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    position: "relative",
                  }}>{item.value < 10 ? `0${item.value}` : item.value}</div>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "8px",
                    marginTop: "4px",
                    position: "relative",
                  }}>{item.label}</div>
                </div>
              ))}
            </div>
            
            {/* Message and valid period */}
            <div style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "20px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.8)",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <p style={{margin: "0 0 8px 0"}}>
                Don't miss the chance — act early for better rewards!
              </p>
              <div style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.6)",
              }}>
                Valid: {formatDate(startDate)} - {formatDate(endDate)}
              </div>
            </div>
            
            {/* Action button */}
            <button style={{
              width: "100%",
              padding: "12px 0",
              background: "white",
              color: colors.dark,
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
            }} onClick={handleBuy}>
              Buy Now
            </button>
          </div>
          
          {/* Close button */}
          <button style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            borderRadius: "50%",
            width: "26px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            cursor: "pointer",
          }} onClick={handleClose}>
            ×
          </button>
        </div>
        
        <style jsx>{`
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
  
  // Style 4: Card with 3D effects
  else if (theme === "style4") {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(10, 46, 25, 0.9)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}>
        <div style={{
          width: "330px",
          maxWidth: "100%",
          background: colors.dark,
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(46, 219, 112, 0.2)",
          animation: "float 6s infinite ease-in-out",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}>
          {/* 3D effect decorations */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: "3px",
            height: "40px",
            background: `linear-gradient(to bottom, ${colors.primary}, transparent)`,
            transform: "translateZ(10px)",
          }}></div>
          
          <div style={{
            position: "absolute",
            top: "20%",
            right: 0,
            width: "2px",
            height: "60px",
            background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)`,
            transform: "translateZ(5px)",
          }}></div>
          
          <div style={{padding: "24px"}}>
            {/* Header */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}>
              <div style={{
                marginBottom: "20px",
                transform: "translateZ(20px)",
              }}>
                <CircularProgress
                  size={80}
                  color={colors.accent}
                  bgColor="rgba(255,255,255,0.1)"
                  strokeW={3}
                />
              </div>
              
              <div style={{
                textAlign: "center",
                transform: "translateZ(15px)",
              }}>
                <h2 style={{
                  margin: "0 0 5px 0",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}>{coinName}</h2>
                <div style={{
                  color: colors.accent,
                  fontSize: "15px",
                  marginBottom: "10px",
                }}>{coinSymbol} Price Update</div>
                
                <div style={{
                  background: isPositive ? "rgba(46, 219, 112, 0.1)" : "rgba(255,107,107,0.1)",
                  display: "inline-block",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  color: isPositive ? colors.accent : "#ff6b6b",
                  fontSize: "15px",
                  fontWeight: "600",
                  border: `1px solid ${isPositive ? "rgba(46, 219, 112, 0.2)" : "rgba(255,107,107,0.2)"}`,
                  transform: "translateZ(25px)",
                }}>
                  {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
                </div>
              </div>
            </div>
            
            {/* Prices */}
            <div style={{
              background: colors.secondary,
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
              transform: "translateZ(30px)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "radial-gradient(circle at top right, rgba(46, 219, 112, 0.1), transparent 70%)",
                borderRadius: "12px",
              }}></div>
              
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}>
                <div style={{
                  flex: 1,
                  textAlign: "center",
                }}>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "13px",
                    marginBottom: "8px",
                  }}>Previous Value</div>
                  <div style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "18px",
                    marginBottom: "4px",
                    textDecoration: "line-through",
                  }}>{oldPriceINR} ₹</div>
                  <div style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                  }}>${oldPriceUSD}</div>
                </div>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  color: colors.accent,
                  padding: "0 5px",
                  transform: "translateZ(40px)",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M19 12l-7 7M19 12l-7-7"/>
                  </svg>
                </div>
                
                <div style={{
                  flex: 1,
                  textAlign: "center",
                }}>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "13px",
                    marginBottom: "8px",
                  }}>Current Value</div>
                  <div style={{
                    color: colors.accent,
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}>{newPriceINR} ₹</div>
                  <div style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                  }}>${newPriceUSD}</div>
                </div>
              </div>
            </div>
            
            {/* Timer */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "20px",
              transform: "translateZ(20px)",
            }}>
              {[
                {value: timeLeft.days, label: "Days"},
                {value: timeLeft.hours, label: "Hours"},
                {value: timeLeft.minutes, label: "Min"},
                {value: timeLeft.seconds, label: "Sec"},
              ].map((item, index) => (
                <div key={index} style={{
                  flex: 1,
                  background: colors.secondary,
                  borderRadius: "10px",
                  padding: "10px 5px",
                  textAlign: "center",
                  boxShadow: index === 3 ? `0 0 10px rgba(46, 219, 112, 0.3)` : "none",
                  border: index === 3 ? `1px solid rgba(46, 219, 112, 0.2)` : "1px solid rgba(255,255,255,0.05)",
                  animation: index === 3 ? "pulse 1s infinite" : "none",
                }}>
                  <div style={{
                    color: index === 3 ? colors.accent : "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}>{item.value < 10 ? `0${item.value}` : item.value}</div>
                  <div style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "10px",
                    marginTop: "2px",
                  }}>{item.label}</div>
                </div>
              ))}
            </div>
            
            {/* Valid period */}
            <div style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "20px",
              textAlign: "center",
              transform: "translateZ(10px)",
            }}>
              Valid: {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            
            {/* Action button */}
            <button style={{
              width: "100%",
              padding: "12px 0",
              background: colors.gradient,
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              transform: "translateZ(25px)",
            }} onClick={handleBuy}>
              Buy Now
            </button>
          </div>
          
          {/* Close button */}
          <button style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "white",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            cursor: "pointer",
            transform: "translateZ(50px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }} onClick={handleClose}>
            ×
          </button>
        </div>
        
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotateX(2deg); }
            50% { transform: translateY(-10px) rotateX(0deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  }
  
  // Style 5: Teal Modern
  else if (theme === "style5") {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}>
        <div style={{
          width: "340px",
          maxWidth: "100%",
          background: colors.dark,
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          animation: "slideUp 0.4s ease-out",
        }}>
          {/* Teal accent bar */}
          <div style={{
            height: "6px",
            background: colors.gradient,
            width: "100%",
          }}></div>
          
          <div style={{padding: "24px"}}>
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}>
              <div>
                <h2 style={{
                  margin: "0 0 6px 0",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "600",
                }}>{coinName}</h2>
                <div style={{
                  color: colors.accent,
                  fontSize: "14px",
                }}>{coinSymbol} Price Update</div>
              </div>
              
              <CircularProgress
                size={60}
                color={colors.primary}
                bgColor="rgba(255,255,255,0.05)"
              />
            </div>
            
            {/* Message */}
            <div style={{
              background: "rgba(255,255,255,0.05)",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
              borderLeft: `3px solid ${colors.primary}`,
            }}>
              <p style={{
                color: "white",
                fontSize: "14px",
                margin: "0",
                lineHeight: "1.5",
              }}>
                Don't miss the chance — the earlier you buy, the bigger your future rewards!
              </p>
            </div>
            
            {/* Timer */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}>
              <div style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "13px",
                whiteSpace: "nowrap",
              }}>Ends in:</div>
              
              <div style={{
                display: "flex",
                gap: "6px",
                flex: 1,
              }}>
                {[
                  {value: timeLeft.days, label: "D"},
                  {value: timeLeft.hours, label: "H"},
                  {value: timeLeft.minutes, label: "M"},
                  {value: timeLeft.seconds, label: "S"},
                ].map((item, index) => (
                  <div key={index} style={{
                    flex: 1,
                    background: colors.secondary,
                    borderRadius: "6px",
                    padding: "8px 4px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}>
                    <div style={{
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}>{item.value < 10 ? `0${item.value}` : item.value}</div>
                    <div style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "10px",
                      marginTop: "2px",
                    }}>{item.label}</div>
                    
                    {/* Progress bar for seconds */}
                    {index === 3 && (
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "2px",
                        width: `${100 - (timeLeft.seconds / 60) * 100}%`,
                        background: colors.primary,
                        transition: "width 1s linear",
                      }}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price comparison */}
            <div style={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "20px",
            }}>
              <div style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div style={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                }}>
                  Price Change
                </div>
                <div style={{
                  color: isPositive ? colors.accent : "#f87171",
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                  {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
                </div>
              </div>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "10px",
                padding: "16px",
                alignItems: "center",
              }}>
                <div>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "12px",
                    marginBottom: "6px",
                  }}>Previous</div>
                  <div style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "4px",
                    textDecoration: "line-through",
                    opacity: 0.7,
                  }}>{oldPriceINR} ₹</div>
                  <div style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                  }}>${oldPriceUSD}</div>
                </div>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  color: colors.accent,
                  height: "1px",
                  width: "20px",
                  background: colors.accent,
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    right: "-5px",
                    top: "-4px",
                    width: 0,
                    height: 0,
                    borderTop: "4px solid transparent",
                    borderBottom: "4px solid transparent",
                    borderLeft: `5px solid ${colors.accent}`,
                  }}></div>
                </div>
                
                <div>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "12px",
                    marginBottom: "6px",
                  }}>Current</div>
                  <div style={{
                    color: colors.accent,
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}>{newPriceINR} ₹</div>
                  <div style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                  }}>${newPriceUSD}</div>
                </div>
              </div>
            </div>
            
            {/* Valid period */}
            <div style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Valid: {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            
            {/* Action button */}
            <button style={{
              width: "100%",
              padding: "12px 0",
              background: colors.gradient,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: `0 4px 12px rgba(13, 148, 136, 0.3)`,
              transition: "all 0.2s",
            }} onClick={handleBuy}>
              Buy Now
            </button>
          </div>
          
          {/* Close button */}
          <button style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "white",
            borderRadius: "50%",
            width: "26px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            cursor: "pointer",
          }} onClick={handleClose}>
            ×
          </button>
        </div>
        
        <style jsx>{`
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
  
  // Style 6: Teal Glass/Frosted
  else if (theme === "style6") {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(4, 47, 46, 0.7)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}>
        <div style={{
          width: "330px",
          maxWidth: "100%",
          background: "rgba(11, 39, 39, 0.7)",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(45, 212, 191, 0.2)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          animation: "fadeIn 0.4s ease-out",
        }}>
          {/* Decorative elements */}
          <div style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            background: `radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%)`,
            top: "-100px",
            right: "-100px",
            borderRadius: "100%",
            zIndex: -1,
          }}></div>
          
          <div style={{
            position: "absolute",
            width: "150px",
            height: "150px",
            background: `radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, transparent 70%)`,
            bottom: "-60px",
            left: "-30px",
            borderRadius: "100%",
            zIndex: -1,
          }}></div>
          
          <div style={{padding: "28px"}}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
            }}>
              <CircularProgress
                size={64}
                color={colors.accent}
                bgColor="rgba(45, 212, 191, 0.1)"
              />
              
              <div>
                <h2 style={{
                  margin: "0 0 4px 0",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "600",
                }}>{coinName}</h2>
                <div style={{
                  color: colors.accent,
                  fontSize: "14px",
                  marginBottom: "8px",
                }}>{coinSymbol} Price Update</div>
                <div style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  background: isPositive ? "rgba(45, 212, 191, 0.1)" : "rgba(248, 113, 113, 0.1)",
                  color: isPositive ? colors.accent : "#f87171",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "600",
                }}>
                  {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
                </div>
              </div>
            </div>
            
            {/* Timer */}
            <div style={{
              display: "flex",
              gap: "10px",
              marginBottom: "24px",
            }}>
              {[
                {value: timeLeft.days, label: "days"},
                {value: timeLeft.hours, label: "hours"},
                {value: timeLeft.minutes, label: "minutes"},
                {value: timeLeft.seconds, label: "seconds"},
              ].map((item, index) => (
                <div key={index} style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  border: index === 3 ? `1px solid rgba(45, 212, 191, 0.3)` : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: index === 3 ? `0 0 15px rgba(45, 212, 191, 0.2)` : "none",
                }}>
                  <div style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}>{item.value < 10 ? `0${item.value}` : item.value}</div>
                  <div style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "10px",
                    marginTop: "4px",
                  }}>{item.label}</div>
                </div>
              ))}
            </div>
            
            {/* Price comparison */}
            <div style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "20px",
              border: "1px solid rgba(45, 212, 191, 0.1)",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}>
                <div style={{
                  flex: 1,
                }}>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "13px",
                    marginBottom: "8px",
                  }}>Previous Price</div>
                  <div style={{
                    color: "white",
                    fontSize: "18px",
                    textDecoration: "line-through",
                    opacity: 0.7,
                    marginBottom: "4px",
                  }}>{oldPriceINR} ₹</div>
                  <div style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                  }}>${oldPriceUSD}</div>
                </div>
                
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                
                <div style={{
                  flex: 1,
                }}>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "13px",
                    marginBottom: "8px",
                  }}>Current Price</div>
                  <div style={{
                    color: colors.accent,
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}>{newPriceINR} ₹</div>
                  <div style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                  }}>${newPriceUSD}</div>
                </div>
              </div>
            </div>
            
            {/* Valid period */}
            <div style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "24px",
              textAlign: "center",
            }}>
              Valid: {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            
            {/* Action button */}
            <button style={{
              width: "100%",
              padding: "14px 0",
              background: "rgba(45, 212, 191, 0.15)",
              color: colors.accent,
              border: `1px solid ${colors.accent}`,
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              backdropFilter: "blur(5px)",
              boxShadow: "0 4px 15px rgba(45, 212, 191, 0.2)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }} onClick={handleBuy}>
              Buy Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
          
          {/* Close button */}
          <button style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "white",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            cursor: "pointer",
            backdropFilter: "blur(5px)",
          }} onClick={handleClose}>
            ×
          </button>
        </div>
        
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
  
  // Default fallback
  return null;
};

export default CoinPricePopup;



