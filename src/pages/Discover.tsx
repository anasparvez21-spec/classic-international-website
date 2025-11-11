import React from "react";

const discoverPosts = [
  {
    title: "Londra polisi, iki gündür kayıp olan Eniscan’ı arıyor",
  },
  {
    title: "Zeytin ADR’den Başkonsolos Ulusoy’a ziyaret",
  },
  {
    title: "'Randevu Sistemimizi Daha Teknolojik Hale Getireceğiz'",
  },
  {
    title: "Arabuluculukta Yeni Bir Ses: Zeytin ADR",
  },
  {
    title: "Gençler Day-Mer Gençlik Futbol Turnuvası’nda Buluştu",
  },
  {
    title: "Day-Mer Çocuk Şenliği’nde Coşkulu Buluşma",
  },
  {
    title: "Suna Alan Vortex Jazz Club’da yeniden sahnede",
  },
];

const Discover: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Latest Posts</h1>
      <div className="space-y-6">
        {discoverPosts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">{post.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
